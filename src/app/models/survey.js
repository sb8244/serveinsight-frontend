export const goalSurveyQuestion = "What do you want to accomplish this week?";

class SurveyList {
  constructor(surveys) {
    this.surveys = surveys;
  }

  count() {
    return this.surveys.length;
  }

  empty() {
    return this.count() === 0;
  }

  upcomingDueSurveyList() {
    let surveys = _(this.surveys).select(function(survey) {
      return survey.isDue({ daysUntilDue: 2 });
    }).value();

    return new SurveyList(surveys);
  }

  dueCount({ daysUntilDue }) {
    return _(this.surveys).select(function(survey) {
      return survey.isDue({ daysUntilDue });
    }).size();
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
        question: goalSurveyQuestion,
        question_type: "string",
        answers: data.goals
      }, this.locked);
    }
  }

  daysUntilDue() {
    var now = moment();
    var dueAt = moment(this.due_at);
    var days = dueAt.diff(now, 'days');
    return days;
  }

  isDue({ daysUntilDue }) {
    return this.daysUntilDue() <= daysUntilDue;
  }

  readyToSubmit() {
    let goalGiven = true;
    let allQuestionsAnswered = _.all(this.questions, (question) => {
      return _.some(question.answers, "content") || _.some(question.answers, "number");
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
            number: answer.number,
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
  markReviewed({ reviewComment }) {
    return this.Restangular.one("reviewable_surveys", this.id).customPOST({ reviewer_comment: reviewComment }, "mark_reviewed");
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
    getList: ({}) => {
      return Restangular.all("survey_instances").getList({ due: true }).then((surveyData) => {
        let surveys = _.map(surveyData.plain(), data => new Survey(data, Restangular));
        return new SurveyList(surveys);
      });
    },
    getCompletedList: () => {
      return Restangular.all("completed_surveys").getList().then(surveys => surveys.plain());
    },
    getReportsCompletedList: () => {
      return Restangular.all("completed_surveys").getList({ all_reports: true }).then(surveys => surveys.plain());
    },
    getReviewable: (id) => {
      return Restangular.one("survey_instances", id).get().then((survey) => new ReviewableSurvey(survey.plain(), Restangular));
    },
    getReviewableList: () => {
      return Restangular.all("reviewable_surveys").getList().then((surveys) => {
        surveys = surveys.plain().map(survey => new ReviewableSurvey(survey, Restangular));
        return new SurveyList(surveys);
      });
    },
    getIndirectReviewableList: () => {
      return Restangular.all("reviewable_surveys").customGETLIST("reports").then((surveys) => {
        surveys = surveys.plain().map(survey => new ReviewableSurvey(survey, Restangular));
        return new SurveyList(surveys);
      });
    },
    getRelatedInsights: (insight) => {
      return Restangular.one("previous_insights", insight.id).customGETLIST().then((surveyData) => {
        let surveys = _.map(surveyData.plain(), data => new Survey(data, null));
        return new SurveyList(surveys);
      });
    }
  };
}
