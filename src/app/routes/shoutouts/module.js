import {} from '../../models/module';
import { ShoutoutsShowController } from './show.controller';

angular.module("shoutouts", [])
  .config(routerConfig);

function routerConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('shoutouts', {
      abstract: true,
      url: '/shoutouts',
      template: '<div ui-view></div>'
    })
    .state('shoutouts.show', {
      url: '/:id',
      templateUrl: 'app/routes/shoutouts/show.html',
      controller: ShoutoutsShowController,
      controllerAs: 'ctrl',
      resolve: {
        shoutout: function(Shoutout, $stateParams) {
          'ngInject';
          return Shoutout.get($stateParams.id);
        }
      }
    });
}
