import {} from '../models/module';

angular.module("team_admin", ["models"])
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
      templateUrl: 'app/team_admin/settings.html'
    })
    .state('team_admin.surveys', {
      url: '/insights',
      templateUrl: 'app/team_admin/surveys.html'
    })
    .state('team_admin.survey', {
      url: '/insights/:id',
      templateUrl: 'app/team_admin/survey.html',
      controllerAs: 'ctrl',
      controller: function($stateParams) {
        'ngInject';

        this.id = $stateParams.id;
      }
    });
}
