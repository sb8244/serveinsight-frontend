class EditableSurvey {
  constructor(data, Restangular) {
    this.data = data;
    this.Restangular = Restangular;
  }

  isEditable() {
    return !this.data.completed_at;
  }

  isCompleteable() {
    return !this.data.completed_at;
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
      question: "",
      question_type: "string"
    });
  }

  setFirstDueAt(time) {
    if (time) {
      this.data.first_due_at = moment(time).format("MM/DD/YYYY HH:mm ZZ");
    } else {
      this.data.first_due_at = undefined;
    }
  }

  save() {
    if (this.data.id) {
      return this.Restangular.one("survey_templates", this.data.id).customPUT(this.data);
    } else {
      return this.Restangular.all("survey_templates").post(this.data);
    }
  }

  markCompleted() {
    if (this.data.id) {
      return this.Restangular.one("survey_templates", this.data.id).customPUT({ completed: true });
    }
  }
}

class EditableSurveyList {
  constructor(surveys) {
    this.surveys = surveys;
  }

  empty() {
    return this.surveys.length === 0;
  }

  completedList() {
    let surveys = _.filter(this.surveys, (survey) => survey.data.completed_at);
    return new EditableSurveyList(surveys);
  }

  activeList() {
    let surveys = _.filter(this.surveys, (survey) => !survey.data.completed_at);
    return new EditableSurveyList(surveys);
  }
}

export function EditableSurveyListFactory(Restangular) {
  'ngInject';

  return {
    emptyEditableSurvey: function() {
      return new EditableSurvey({
        name: "Weekly Insight",
        recurring: true,
        goals_section: true,
        questions: []
      }, Restangular);
    },
    getList: function() {
      return Restangular.all("survey_templates").getList().then(function(templates) {
        let surveys = templates.map(function(data) {
          return new EditableSurvey(data, Restangular);
        });
        return new EditableSurveyList(surveys);
      });
    },
    get: function(id) {
      return Restangular.one("survey_templates", id).get().then(function(survey) {
        return new EditableSurvey(survey, Restangular);
      });
    }
  };
}
