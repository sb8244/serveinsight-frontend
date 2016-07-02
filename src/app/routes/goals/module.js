import {} from '../../models/module';

import { ShowController } from './show.controller';

angular.module("goals", [])
  .config(routerConfig);

function routerConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('goals_show', {
      url: '/goals/:id',
      templateUrl: 'app/routes/goals/show.html',
      controller: ShowController,
      controllerAs: 'ctrl',
      resolve: {
        goal: function(Goal, $stateParams) {
          'ngInject';
          return Goal.find($stateParams.id);
        }
      }
    });
}
