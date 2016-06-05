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
  constructor() {
    'ngInject';

    if (!this.survey.locked) {
      _.each(this.survey.questions, question => question.addBlankAnswer());
    }

    this.goal_question = this.survey.goals_section;
  }

  submitSurvey() {
  }
}
