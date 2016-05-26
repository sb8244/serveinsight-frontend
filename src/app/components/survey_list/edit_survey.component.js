import ngInject from '../../decorators/ng_inject';

@ngInject('EditableSurveyList')
class Controller {
  constructor() {
    this.EditableSurveyList.get(this.id).then((survey) => {
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
