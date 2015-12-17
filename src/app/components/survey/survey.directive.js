export function SurveyDirective() {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'app/components/survey/survey.html',
    scope: {
      survey: '='
    },
    controller: SurveyController,
    controllerAs: 'ctrl',
    bindToController: true
  }
}

class SurveyController {
  constructor(Person) {
    'ngInject';

    Person.getList().then(personList => {
      this.people = personList.people;
    });

    _.each(this.survey.questions, function(question) {
      this.addBlankAnswer(question);
    }, this);
  }

  submitSurvey() {
  }

  cleanupAnswer(question, answer) {
    if (!answer.value) {
      _.remove(question.answers, answer);
    }

    this.addBlankAnswer(question);
  }

  addBlankAnswer(question) {
    if (this.questionNeedsBlankAnswer(question)) {
        question.answers.push({
        value: ""
      });
    }
  }

  questionNeedsBlankAnswer(question) {
    return _.all(question.answers, function(answer) {
      return answer.value;
    });
  }
}
