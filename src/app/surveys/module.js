import {} from '../models/module';

import { MySurveyController } from './my_survey_controller';
import { CompletedSurveysController } from './completed_surveys_controller';

angular.module("surveys", ["models"])
  .config(routerConfig)
  .controller("MySurveysController", MySurveyController)
  .controller("CompletedSurveysController", CompletedSurveysController);

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
    .state('surveys.completed', {
      url: '/completed',
      templateUrl: 'app/surveys/completed.html',
      controller: 'CompletedSurveysController',
      controllerAs: 'ctrl',
      resolve: {
        surveys: function(Survey) {
          'ngInject';
          return Survey.getCompletedList();
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
