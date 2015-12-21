import {} from '../models/module';

import { LoginController } from './controller';

angular.module("login", ["models"])
  .config(routerConfig)
  .controller("LoginController", LoginController);

function routerConfig ($stateProvider) {
  'ngInject';

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: "app/login/login.html",
      controller: "LoginController",
      controllerAs: "ctrl"
    });
}
