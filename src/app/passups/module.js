import {} from '../models/module';

import { ListController } from './list_controller';

angular.module("passups", ["models"])
  .config(routerConfig)
  .controller("PassupsListController", ListController);

function routerConfig ($stateProvider) {
  'ngInject';

  $stateProvider
    .state('passups', {
      url: '/passups',
      abstract: true,
      template: "<div ui-view></div>"
    })
    .state('passups.list', {
      url: "",
      templateUrl: 'app/passups/list.html',
      controller: 'PassupsListController',
      controllerAs: 'ctrl',
      resolve: {
        passupList: function(Passup) {
          'ngInject';
          return Passup.getList();
        }
      }
    })
  ;
}
