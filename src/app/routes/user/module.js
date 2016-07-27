import {} from '../../models/module';
import { UserSettingsController } from './settings.controller';

angular.module("user", [])
  .config(routerConfig);

function routerConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('user', {
      abstract: true,
      url: '/user',
      template: '<div ui-view></div>'
    })
    .state('user.settings', {
      url: '/settings',
      controller: UserSettingsController,
      controllerAs: "ctrl",
      templateUrl: "app/routes/user/settings.html",
      resolve: {
        member: function(OrganizationMember) {
          'ngInject';

          return OrganizationMember.getClean();
        }
      }
    });
}
