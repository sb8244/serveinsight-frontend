import ngInject from '../../decorators/ng_inject'

export function SurveyDirective() {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'app/components/survey/survey.html',
    scope: {
      survey: '=',
      reviewing: '='
    },
    controller: SurveyController,
    controllerAs: 'ctrl',
    bindToController: true
  }
}

@ngInject("notify", "$state", "HeaderState")
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
        this.HeaderState.updateDueSurveyCount();
        this.$state.go("surveys.my_recent", {}, { reload: true });
      });
    }
  }

  markReviewed() {
    this.survey.markReviewed().then(() => {
      this.notify("Survey Reviewed!");
      this.HeaderState.updateReviewableCount();
      this.$state.go("surveys.reports");
    });
  }
}
