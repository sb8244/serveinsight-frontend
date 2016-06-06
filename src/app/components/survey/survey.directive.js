import ngInject from '../../decorators/ng_inject'

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

@ngInject("notify")
class SurveyController {
  constructor() {
    'ngInject';

    if (!this.survey.locked) {
      _.each(this.survey.questions, question => question.addBlankAnswer());

      if (this.survey.goal_question) {
        this.survey.goal_question.addBlankAnswer();
      }
    }
  }

  submitSurvey() {
    let promise = this.survey.submit();
    if (promise) {
      promise.then(() => {
        this.notify("Thanks! Your Insight has been saved.")
      });
    }
  }
}
