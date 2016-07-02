import {} from '../../models/module';

import { NotificationsIndexController } from './index.controller.js';

angular.module("notifications", [])
  .config(routerConfig);

function routerConfig ($stateProvider) {
  'ngInject';

  $stateProvider
    .state('notification_list', {
      url: '/notifications',
      templateUrl: "app/routes/notifications/list.html",
      controllerAs: "ctrl",
      controller: NotificationsIndexController
    });
}
