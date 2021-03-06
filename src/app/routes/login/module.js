import {} from '../../models/module';

import { LoginController } from './login.controller';
import { ConfirmTokenController } from './confirm_token.controller';

angular.module("login", [])
  .config(routerConfig);

function routerConfig ($stateProvider) {
  'ngInject';

  $stateProvider
    .state('login', {
      url: '/login?inviteOnly',
      templateUrl: "app/routes/login/login.html",
      controller: LoginController,
      controllerAs: "ctrl",
      login_route: true
    })
    .state('register', {
      url: '/register',
      templateUrl: "app/routes/login/register.html",
      login_route: true
    })
    .state('forgot_password', {
      url: '/forgot_password',
      templateUrl: "app/routes/login/forgot_password.html",
      login_route: true
    })
    .state('reset_password', {
      url: '/reset_password?reset_password_token',
      templateUrl: "app/routes/login/reset_password.html",
      login_route: true
    })
    .state('confirm_email', {
      url: '/confirm_email',
      templateUrl: "app/routes/login/confirm_email.html",
      confirm_route: true
    })
    .state('confirm_token', {
      url: '/confirm/token?confirmation_token',
      controller: ConfirmTokenController,
      controllerAs: "ctrl",
      confirm_route: true
    });
}
