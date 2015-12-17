import {} from '../models/module';

import { MySurveyController } from './my_survey_controller';

angular.module("surveys", ["models"])
  .config(routerConfig)
  .controller("MySurveysController", MySurveyController);

function routerConfig ($stateProvider) {
  'ngInject';

  $stateProvider
    .state('surveys', {
      url: '/surveys',
      abstract: true,
      template: "<div ui-view></div>"
    })
    .state('surveys.my_recent', {
      url: "",
      templateUrl: 'app/surveys/mine.html',
      controller: 'MySurveysController',
      controllerAs: 'ctrl',
      resolve: {
        survey: function(Survey) {
          'ngInject';
          return Survey.getMostRecent();
        }
      }
    })
    .state('surveys.my_show', {
      url: "/:id",
      templateUrl: 'app/surveys/mine.html',
      controller: 'MySurveysController',
      controllerAs: 'ctrl',
      resolve: {
        survey: function(Survey, $stateParams) {
          'ngInject';
          return Survey.get($stateParams.id);
        }
      }
    });
}
