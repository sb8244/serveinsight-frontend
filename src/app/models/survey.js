class SurveyList {
  constructor(surveys) {
    this.surveys = surveys;
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
        answers: []
      }, this.locked);
    }
  }

  readyToSubmit() {
    let goalGiven = true;
    let allQuestionsAnswered = _.all(this.questions, (question) => {
      return _.some(question.answers, "content");
    });

    if (this.goal_question) {
      goalGiven = _.some(this.goal_question.answers, "content");
    }

    return allQuestionsAnswered && goalGiven;
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
      })
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
    }
  };
}
