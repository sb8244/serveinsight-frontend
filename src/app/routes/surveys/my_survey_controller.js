import ngInject from '../../decorators/ng_inject';

@ngInject("survey", "Survey")
export class MySurveyController {
  constructor(survey, Survey) {
    Survey.getList({}).then((surveyList) => {
      this.surveyList = surveyList;
    });
  }
}
