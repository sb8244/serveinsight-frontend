import ngInject from '../../decorators/ng_inject';

@ngInject('notify', 'Restangular')
class Controller {
  constructor() {
    this.recurringSurveys = [
      {
        id: 1,
        name: "Weekly Insights Report",
        users_in_scope: 34,
        responses: 215,
        created_at: moment().subtract(5, "months").toJSON(),
        active: true,
        recurring: true,
        creator: "Steve Bussey"
      },
      {
        id: 2,
        name: "Weekly Insights Report",
        users_in_scope: 34,
        responses: 215,
        created_at: moment().subtract(5, "months").toJSON(),
        active: false,
        recurring: true,
        creator: "Brian Culler"
      }
    ];
  }
}

export const AdminSurveyList = {
  templateUrl: 'app/components/survey_list/admin_survey_list.html',
  controller: Controller,
  controllerAs: 'ctrl',
  bindings: {}
};
