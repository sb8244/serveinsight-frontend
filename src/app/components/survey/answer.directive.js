export function SurveyAnswerDirective() {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'app/components/survey/answer.html',
    scope: {
      answer: '=',
      question: '='
    },
    controller: SurveyAnswerController,
    controllerAs: 'ctrl',
    bindToController: true
  }
}

class SurveyAnswerController {
  constructor(Person) {
    'ngInject';

    Person.getList().then(personList => this.people = personList.people);
  }
}