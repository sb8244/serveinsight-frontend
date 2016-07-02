import {} from '../../models/module';

angular.module("team_admin", [])
  .config(routerConfig);

function routerConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('team_admin', {
      abstract: true,
      url: '/team',
      template: '<div ui-view></div>'
    })
    .state('team_admin.settings', {
      url: '/',
      templateUrl: 'app/routes/team_admin/settings.html'
    })
    .state('team_admin.surveys', {
      url: '/insights',
      templateUrl: 'app/routes/team_admin/surveys.html'
    })
    .state('team_admin.survey_new', {
      url: '/insights/new',
      templateUrl: 'app/routes/team_admin/new_survey.html'
    })
    .state('team_admin.survey', {
      url: '/insights/:id',
      templateUrl: 'app/routes/team_admin/survey.html',
      controllerAs: 'ctrl',
      controller: function($stateParams) {
        'ngInject';

        this.id = $stateParams.id;
      }
    })
    ;
}
