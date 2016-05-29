class EditableSurvey {
  constructor(data, Restangular) {
    this.data = data;
    this.Restangular = Restangular;
  }

  valid() {
    return this.data.name && this.data.questions.length && _.all(this.data.questions, "question");
  }

  moveQuestion(index, change) {
    var newIndex = index + change;
    var question = this.removeQuestion(index);
    this.data.questions.splice(newIndex, 0, question);
  }

  removeQuestion(index) {
    return _.pullAt(this.data.questions, index)[0];
  }

  addQuestion() {
    this.data.questions.push({
      id: null,
      question: ""
    });
  }

  save() {
    if (this.data.id) {
      return this.Restangular.one("survey_templates", this.data.id).customPUT(this.data);
    } else {
      return this.Restangular.all("survey_templates").post(this.data);
    }
  }
}

export function EditableSurveyListFactory(Restangular) {
  'ngInject';

  return {
    emptyEditableSurvey: function() {
      return new EditableSurvey({
        name: "Weekly Insight",
        questions: []
      }, Restangular);
    },
    getList: function() {
      return Restangular.all("survey_templates").getList().then(function(templates) {
        return templates.map(function(data) {
          return new EditableSurvey(data, Restangular);
        });
      });
    },
    get: function(id) {
      return Restangular.one("survey_templates", id).get().then(function(survey) {
        return new EditableSurvey(survey, Restangular);
      });
    }
  };
}
