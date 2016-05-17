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
      templateUrl: 'app/team_admin/settings.html',
      controllerAs: 'ctrl',
      controller: function(hierarchy) {
        'ngInject';
        this.hierarchy = hierarchy;
        this.hierarchyUpdated = () => this.canSave = true;
      },
      resolve: {
        hierarchy: function(Restangular) {
          'ngInject';

          return Restangular.all("users").getList().then((users) => {
            return users.map((user) => {
              // Strip out unnecessary data to avoid bugs
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                reviewer_id: user.reviewer_id
              };
            });
          });
        }
      }
    });
}
