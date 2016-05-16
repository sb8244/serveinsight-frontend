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
        hierarchy: function() {
          'ngInject';
          return getOrganizationData();
        }
      }
    });
}

function getOrganizationData() {
  return [
    {
      id: 1,
      email: "mike.o@test.com",
      name: "Mike Oliver",
      reviewer_id: null
    },
    {
      id: 2,
      email: "jim.x@test.com",
      name: "Jim Xavier",
      reviewer_id: 1
    },
    {
      id: 3,
      email: "alice.k@test.com",
      name: "Alice Kim",
      reviewer_id: 1
    },
    {
      id: 4,
      email: "bob.b@test.com",
      name: "Bob Bobsen",
      reviewer_id: 2
    },
    {
      id: 5,
      email: "carol.w@test.com",
      name: "Carol Well",
      reviewer_id: 4
    }
  ];
}
