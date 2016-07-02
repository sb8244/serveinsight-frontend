import {} from '../../models/module';
import { SetupController } from './controller.js';

angular.module("setup", [])
  .config(routerConfig)
  .controller("SetupController", SetupController);

function routerConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('setup_wizard', {
      url: '/setup',
      templateUrl: 'app/routes/setup/setup.html',
      controller: 'SetupController',
      controllerAs: 'ctrl'
    });
}
