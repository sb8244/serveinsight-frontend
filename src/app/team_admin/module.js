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
      },
      resolve: {
        hierarchy: function() {
          'ngInject';
          return getData();
        }
      }
    });
}

function getData() {
  return {
      "cols" : [
          {"label": "Name", "pattern": "", "type": "string"},
          {"label": "Manager", "pattern": "", "type": "string"}
      ],
      "rows" : [
          {"c": [
              {"v": "mike.o@test.com", "f": "Mike O."},
              {"v": ""}
          ]},
          {"c": [
              {"v": "jim@test.com", "f": "Jim"},
              {"v": "mike.o@test.com"}
          ]},
          {"c": [
              {"v": "alice@test.com", "f": "Alice"},
              {"v": "mike.o@test.com"}
          ]},
          {"c": [
              {"v": "bob@test.com", "f": "Bob"},
              {"v": "jim@test.com"}
          ]},
          {"c": [
              {"v": "carol@test.com", "f": "Carol"},
              {"v": "bob@test.com"}
          ]}
      ]
    };
}
