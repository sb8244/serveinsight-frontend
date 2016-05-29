import ngInject from '../../decorators/ng_inject';

@ngInject('notify', '$state', 'EditableSurveyList')
class Controller {
  constructor() {
    this.EditableSurveyList.getList().then((surveyList) => {
      this.recurringSurveys = surveyList;
    });
  }

  newSurvey() {
    this.$state.go('team_admin.survey_new');
  }
}

export const AdminSurveyList = {
  templateUrl: 'app/components/survey_list/admin_survey_list.html',
  controller: Controller,
  controllerAs: 'ctrl',
  bindings: {}
};
