import {} from '../models/module';

import { ListController } from './list_controller';
import { ShowController } from './show_controller';

angular.module("passups", ["models"])
  .config(routerConfig);

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
      controller: ListController,
      controllerAs: 'ctrl',
      resolve: {
        passupList: function(Passup) {
          'ngInject';
          return Passup.getList();
        }
      }
    })
    .state("passups.show", {
      url: "/:id",
      templateUrl: "app/passups/show.html",
      controller: ShowController,
      controllerAs: "ctrl",
      resolve: {
        passup: function(Passup, $stateParams) {
          'ngInject';
          return Passup.find($stateParams.id);
        }
      }
    });
}
