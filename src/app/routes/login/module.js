import {} from '../../models/module';

import { LoginController } from './controller';

angular.module("login", [])
  .config(routerConfig)
  .controller("LoginController", LoginController);

function routerConfig ($stateProvider) {
  'ngInject';

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: "app/routes/login/login.html",
      controller: "LoginController",
      controllerAs: "ctrl"
    });
}
