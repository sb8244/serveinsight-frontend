import ngInject from '../../decorators/ng_inject';

@ngInject('notify', 'Restangular')
class Controller {
  constructor() {
    this.surveys = [
      {
        id: 1,
        name: "Weekly Insights Report",
        users_in_scope: 34,
        responses: 215,
        created_at: moment().subtract(5, "months").toJSON()
      },
      {
        id: 1,
        name: "Weekly Insights Report",
        users_in_scope: 34,
        responses: 215,
        created_at: moment().subtract(5, "months").toJSON()
      }
    ]
  }
}

export const AdminSurveyList = {
  templateUrl: 'app/components/survey_list/admin_survey_list.html',
  controller: Controller,
  controllerAs: 'ctrl',
  bindings: {}
};
