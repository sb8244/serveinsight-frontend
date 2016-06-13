import ngInject from '../decorators/ng_inject';

@ngInject("reviewableSurveys", "Survey")
export class ReportsSurveysController {
  constructor() {
    this.Survey.getIndirectReviewableList().then((surveys) => {
      this.indirectReviewableSurveys = surveys;
    }).finally(() => this.indirectReviewableSurveysLoaded = true);
  }
}
