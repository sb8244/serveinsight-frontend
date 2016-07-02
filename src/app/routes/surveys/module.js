import {} from '../../models/module';

import { MySurveyController } from './my_survey_controller';
import { CompletedSurveysController } from './completed_surveys_controller';
import { ReportsSurveysController } from './reports_surveys_controller';
import { ReportsCompletedSurveysController } from './reports_completed_surveys_controller';
import { ReportsCompletedShowController } from './reports_completed_show_controller';

angular.module("surveys", [])
  .config(routerConfig);

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
      templateUrl: 'app/routes/surveys/mine.html',
      controller: MySurveyController,
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
      templateUrl: 'app/routes/surveys/completed.html',
      controller: CompletedSurveysController,
      controllerAs: 'ctrl',
      resolve: {
        surveys: function(Survey) {
          'ngInject';
          return Survey.getCompletedList();
        }
      }
    })
    .state('surveys.completed_show', {
      url: "/completed/:id",
      templateUrl: 'app/routes/surveys/mine_completed.html',
      controller: MySurveyController,
      controllerAs: 'ctrl',
      resolve: {
        survey: function(Survey, $stateParams) {
          'ngInject';
          return Survey.get($stateParams.id);
        }
      }
    })
    .state('surveys.reports', {
      url: "/managed",
      templateUrl: 'app/routes/surveys/reports.html',
      controller: ReportsSurveysController,
      controllerAs: 'ctrl',
      resolve: {
        reviewableSurveys: function(Survey) {
          'ngInject';
          return Survey.getReviewableList();
        }
      }
    })
    .state('surveys.reports_completed', {
      url: "/managed/completed",
      templateUrl: 'app/routes/surveys/reports_completed.html',
      controller: ReportsCompletedSurveysController,
      controllerAs: 'ctrl',
      resolve: {
        reportsCompletedList: function(Survey) {
          'ngInject';
          return Survey.getReportsCompletedList();
        }
      }
    })
    .state('surveys.reports_completed_show', {
      url: "/managed/completed/:id",
      templateUrl: 'app/routes/surveys/reports_completed_show.html',
      controller: ReportsCompletedShowController,
      controllerAs: 'ctrl',
      resolve: {
        survey: function(Survey, $stateParams) {
          'ngInject';
          return Survey.get($stateParams.id);
        }
      }
    })
    .state('surveys.reports_show', {
      url: "/managed/:id",
      templateUrl: 'app/routes/surveys/reports_show.html',
      controller: MySurveyController,
      controllerAs: 'ctrl',
      resolve: {
        survey: function(Survey, $stateParams) {
          'ngInject';
          return Survey.getReviewable($stateParams.id);
        }
      }
    })
    .state('surveys.my_show', {
      url: "/:id",
      templateUrl: 'app/routes/surveys/mine.html',
      controller: MySurveyController,
      controllerAs: 'ctrl',
      resolve: {
        survey: function(Survey, $stateParams) {
          'ngInject';
          return Survey.get($stateParams.id);
        }
      }
    });
}
