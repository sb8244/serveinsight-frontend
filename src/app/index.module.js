/* global moment:false */

import {} from './dashboard/module';
import {} from './surveys/module';

import { config } from './index.config';
import { runBlock } from './index.run';
import { HeaderDirective } from './components/header/header.directive';
import { NavDirective } from './components/nav/nav.directive';
import { CustomScrollbarDirective } from './components/custom_scrollbar/directive';
import { SurveyDirective } from './components/survey/survey.directive';
import { SurveyAnswerDirective } from './components/survey/answer.directive';
import { CommentsDirective } from './components/comments/comments.directive';
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
    'dashboard',
    'surveys'
  ])
  .constant('moment', moment)
  .config(config)
  .run(runBlock)
  .directive('appHeader', HeaderDirective)
  .directive('appNav', NavDirective)
  .directive('customScrollbar', CustomScrollbarDirective)
  .directive('survey', SurveyDirective)
  .directive('surveyAnswer', SurveyAnswerDirective)
  .directive('comments', CommentsDirective)
  .directive('autofocus', AutofocusDirective)
;
