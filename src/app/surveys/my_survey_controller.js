export class MySurveyController {
  constructor(SurveyListFactory) {
    'ngInject';

    SurveyListFactory.getList().then((surveyList) => {
      this.surveyList = surveyList;
    });
  }
}
