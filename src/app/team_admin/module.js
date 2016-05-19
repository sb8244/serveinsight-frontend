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
      controller: function(hierarchy, Restangular) {
        'ngInject';
        this.hierarchy = hierarchy;
        this.orgChartCallbacks = {};
        this.hierarchyUpdated = () => this.canSave = true;
        this.userInvited = () => {
          getHierarchy(Restangular).then((hierarchy) => {
            this.hierarchy = hierarchy;
            this.orgChartCallbacks.updateChart(this.hierarchy);
          });
        };

        this.save = (hierarchy) => {
          let data = hierarchy.map((obj) => {
            return {
              id: obj.id,
              name: obj.name,
              reviewer_id: obj.reviewer_id
            };
          });

          Restangular.all("organization_memberships").customPUT({ data }, "bulk_update").then(() => {
            this.orgChartCallbacks.reset();
          }).finally(() => this.canSave = false);
        };
      },
      resolve: {
        hierarchy: function(Restangular) {
          'ngInject';

          return getHierarchy(Restangular);
        }
      }
    });
}

function getHierarchy(Restangular) {
  return Restangular.all("organization_memberships").getList().then((data) => {
    return data.map((member) => {
      // Strip out unnecessary data to avoid bugs
      return {
        id: member.id,
        name: member.name,
        email: member.email,
        reviewer_id: member.reviewer_id
      };
    });
  });
}
