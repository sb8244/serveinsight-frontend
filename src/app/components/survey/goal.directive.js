export function SurveyGoalDirective() {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'app/components/survey/goal.html',
    scope: {
      goal: '='
    },
    controller: SurveyGoalController,
    controllerAs: 'ctrl',
    bindToController: true
  }
}

class SurveyGoalController {
  constructor(Person) {
    'ngInject';

    Person.getList().then(personList => this.people = personList.people);
  }
}