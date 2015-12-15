import { DashboardController } from "./controller";

angular.module("dashboard", [])
  .config(routerConfig)
  .controller("DashboardController", DashboardController);

function routerConfig ($stateProvider) {
  'ngInject';

  $stateProvider
    .state('dashboard', {
      url: '/',
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'ctrl'});
}
