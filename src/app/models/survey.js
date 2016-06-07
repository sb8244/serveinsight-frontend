class SurveyList {
  constructor(surveys) {
    this.surveys = surveys;
  }

  count() {
    return this.surveys.length;
  }

  dueCount() {
    return _(this.surveys).select({ completed: false }).size();
  }
}

class Question {
  constructor(data, locked) {
    _.extend(this, data);
    this.surveyLocked = locked;
  }

  questionNeedsBlankAnswer() {
    if (this.surveyLocked) {
      return false;
    }

    return this.answers.length === 0 || _.all(this.answers, function(answer) {
      return answer.content;
    });
  }

  cleanupAnswer(answer) {
    if (!answer.content) {
      var lastAnswer = _.last(this.answers);

      if (!lastAnswer.content) {
        _.remove(this.answers, lastAnswer);
      }
    }

    this.addBlankAnswer();
  }

  addBlankAnswer() {
    if (this.questionNeedsBlankAnswer()) {
      this.answers.push({
        content: ""
      });
    }
  }
}

class Survey {
  constructor(data, Restangular) {
    _.extend(this, data);
    this.questions = _.map(this.questions, question => new Question(question, this.locked));
    this.Restangular = Restangular;

    if (data.goals_section) {
      this.goal_question = new Question({
        question: "What do you want to accomplish this week?",
        answers: data.goals
      }, this.locked);
    }
  }

  readyToSubmit() {
    let goalGiven = true;
    let allQuestionsAnswered = _.all(this.questions, (question) => {
      return _.some(question.answers, "content");
    });
    let allPreviousGoalsUpdated = _.all(this.previous_goals, goal => goal.status);

    if (this.goal_question) {
      goalGiven = _.some(this.goal_question.answers, "content");
    }

    return allQuestionsAnswered && goalGiven && allPreviousGoalsUpdated;
  }

  postData() {
    let data = {
      survey_instance_id: this.id,
      answers: _.map(this.questions, function(question) {
        return _.map(question.answers, function(answer) {
          return {
            content: answer.content,
            question_id: question.id
          };
        })
      }),
      goal_statuses: _.zipObject(_.map(this.previous_goals, function(goal) {
        return [goal.id, goal.status]
      }))
    };

    if (this.goal_question) {
      data.goals = _.map(this.goal_question.answers, function(answer) {
        return {
          content: answer.content
        };
      });
    }

    data.answers = _.flatten(data.answers);

    return data;
  }

  submit() {
    if (this.readyToSubmit()) {
      return this.Restangular.all("completed_surveys").post(this.postData());
    }
  }
}

class ReviewableSurvey extends Survey {
  markReviewed() {
    return this.Restangular.one("reviewable_surveys", this.id).customPOST({}, "mark_reviewed");
  }
}

export function SurveyFactory(Restangular) {
  'ngInject';

  return {
    get: (id) => {
      return Restangular.one("survey_instances", id).get().then((survey) => new Survey(survey.plain(), Restangular));
    },
    getMostRecent: () => {
      return Restangular.all("survey_instances").one("top_due").get().then((survey) => new Survey(survey.plain(), Restangular));
    },
    getList: () => {
      return Restangular.all("survey_instances").getList({ due: true }).then((surveys) => new SurveyList(surveys.plain()));
    },
    getCompletedList: () => {
      return Restangular.all("completed_surveys").getList().then(surveys => surveys.plain());
    },
    getReviewable: (id) => {
      return Restangular.one("survey_instances", id).get().then((survey) => new ReviewableSurvey(survey.plain(), Restangular));
    },
    getReviewableList: () => {
      return Restangular.all("reviewable_surveys").getList().then((surveys) => {
        var surveys = surveys.plain().map(survey => new ReviewableSurvey(survey, Restangular));
        return new SurveyList(surveys);
      });
    }
  };
}
