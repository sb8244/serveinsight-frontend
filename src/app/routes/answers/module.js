import {} from '../../models/module';

import { AnswerShowController } from './show.controller';

angular.module("answers", ["models"])
  .config(routerConfig);

function routerConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('answers_show', {
      url: '/answers/:id',
      templateUrl: 'app/routes/answers/show.html',
      controller: AnswerShowController,
      controllerAs: 'ctrl',
      resolve: {
        answer: function(Answer, $stateParams) {
          'ngInject';
          return Answer.find($stateParams.id);
        }
      }
    });
}
