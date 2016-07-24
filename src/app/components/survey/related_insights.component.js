import ngInject from '../../decorators/ng_inject'

@ngInject("Survey")
class RelatedInsightsController {
  constructor(Survey) {
    if (this.survey) {
      Survey.getRelatedInsights(this.survey).then((list) => {
        this.surveyList = list;
      }).catch(() => {
        this.hidden = true;
      }).finally(() => this.loaded = true);
    }
  }
}

export const RelatedInsightsComponent = {
  templateUrl: "app/components/survey/related_insights.html",
  controllerAs: "ctrl",
  controller: RelatedInsightsController,
  bindings: {
    survey: "="
  }
}
