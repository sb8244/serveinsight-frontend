import ngInject from '../../decorators/ng_inject';

@ngInject('SurveyList')
class Controller {
  constructor() {
    this.SurveyList.get(this.id).then((survey) => {
      this.survey = survey;
    });
  }
}

export const EditSurvey = {
  templateUrl: 'app/components/survey_list/edit_survey.html',
  controller: Controller,
  controllerAs: 'ctrl',
  bindings: {
    id: "="
  }
};
