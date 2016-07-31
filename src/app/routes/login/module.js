import {} from '../../models/module';

import { LoginController } from './login.controller';

angular.module("login", [])
  .config(routerConfig);

function routerConfig ($stateProvider) {
  'ngInject';

  $stateProvider
    .state('login', {
      url: '/login?inviteOnly',
      templateUrl: "app/routes/login/login.html",
      controller: LoginController,
      controllerAs: "ctrl"
    });
}
