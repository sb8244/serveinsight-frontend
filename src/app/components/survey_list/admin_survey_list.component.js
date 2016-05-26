import ngInject from '../../decorators/ng_inject';

@ngInject('notify', 'SurveyList')
class Controller {
  constructor() {
    this.SurveyList.getList().then((surveyList) => {
      this.recurringSurveys = surveyList;
    })
  }
}

export const AdminSurveyList = {
  templateUrl: 'app/components/survey_list/admin_survey_list.html',
  controller: Controller,
  controllerAs: 'ctrl',
  bindings: {}
};
