import ngInject from '../../decorators/ng_inject';

@ngInject('notify', 'EditableSurveyList')
class Controller {
  constructor() {
    this.EditableSurveyList.get(this.id).then((survey) => {
      this.survey = survey;
    });
  }

  save() {
    this.survey.save().then(() => {
      this.notify("Insight Updated");
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
