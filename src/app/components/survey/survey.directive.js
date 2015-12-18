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

    this.goal_question = _.find(this.survey.questions, { goals_section: true });
    this.questions_section = _.select(this.survey.questions, question => !question.goals_section);
  }

  submitSurvey() {
  }
}
