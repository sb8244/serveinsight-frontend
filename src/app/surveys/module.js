import {} from '../models/module';

import { MySurveyController } from './my_survey_controller';
import { CompletedSurveysController } from './completed_surveys_controller';
import { ReportsSurveysController } from './reports_surveys_controller';

angular.module("surveys", ["models"])
  .config(routerConfig)
  .controller("MySurveysController", MySurveyController)
  .controller("CompletedSurveysController", CompletedSurveysController)
  .controller("ReportsSurveysController", ReportsSurveysController);

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
          return Survey.getMostRecent().catch(() => false);
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
    .state('surveys.reports', {
      url: "/managed",
      templateUrl: 'app/surveys/reports.html',
      controller: ReportsSurveysController,
      controllerAs: 'ctrl',
      resolve: {
        reviewableSurveys: function(Survey) {
          'ngInject';
          return Survey.getReviewableList();
        }
      }
    })
    .state('surveys.reports_show', {
      url: "/managed/:id",
      templateUrl: 'app/surveys/reports_show.html',
      controller: 'MySurveysController',
      controllerAs: 'ctrl',
      resolve: {
        survey: function(Survey, $stateParams) {
          'ngInject';
          return Survey.get($stateParams.id);
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
