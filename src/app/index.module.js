/* global moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { HeaderDirective } from '../app/components/header/header.directive';
import { CustomScrollbarDirective } from '../app/components/custom_scrollbar/directive';

angular.module('frontend',
  [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'restangular',
    'ui.router',
    'toastr',
    'ui.bootstrap'
  ])
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .directive('appHeader', HeaderDirective)
  .directive('customScrollbar', CustomScrollbarDirective)
;
