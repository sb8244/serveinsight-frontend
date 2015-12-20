/* global moment:false */

import {} from './dashboard/module';
import {} from './surveys/module';
import {} from './models/module';
import {} from './passups/module';

import { config } from './index.config';
import { runBlock } from './index.run';
import { HeaderDirective } from './components/header/header.directive';
import { NavDirective } from './components/nav/nav.directive';
import { CustomScrollbarDirective } from './components/custom_scrollbar/directive';
import { SurveyDirective } from './components/survey/survey.directive';
import { SurveyAnswerDirective } from './components/survey/answer.directive';
import { SurveyGoalDirective } from './components/survey/goal.directive';
import { CommentsDirective } from './components/comments/comments.directive';
import { Permissions } from './services/permissions';
import { AutofocusDirective } from './components/autofocus/directive';

angular.module('frontend',
  [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngMessages',
    'angularMoment',
    'restangular',
    'ui.router',
    'ui.bootstrap',
    'mentio',
    'ui.select',
    'models',
    'dashboard',
    'surveys',
    'passups'
  ])
  .constant('moment', moment)
  .config(config)
  .run(runBlock)
  .run(globalAvailability)
  .directive('appHeader', HeaderDirective)
  .directive('appNav', NavDirective)
  .directive('customScrollbar', CustomScrollbarDirective)
  .directive('survey', SurveyDirective)
  .directive('surveyAnswer', SurveyAnswerDirective)
  .directive('surveyGoal', SurveyGoalDirective)
  .directive('comments', CommentsDirective)
  .directive('autofocus', AutofocusDirective)
  .service('Permissions', Permissions)
;

function globalAvailability ($rootScope, Permissions) {
  'ngInject';
  $rootScope.Permissions = Permissions;
}
