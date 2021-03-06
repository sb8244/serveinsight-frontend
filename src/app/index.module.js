/* global moment:false */

import {} from './models/module';
import {} from './routes/module';
import {} from './components/module';
import {} from './vendor/bugsnag';

import { config } from './index.config';
import { runBlock, notifyConfig, inviteRunBlock } from './index.run';

import { Permissions } from './services/permissions';
import { notifyError } from './services/notifyError';
import { unprocessableEntityText } from './services/unprocessableText';
import { MentionHighlight } from './filters/mention_highlight';
import { humanizeConstant } from './filters/humanizeConstant';

angular.module('frontend',
  [
    'angular-loading-bar',
    'bugsnag',
    'angularMoment',
    'focus-if',
    'cgNotify',
    'googlechart',
    'ngAnimate',
    'ngStorage',
    'ngTouch',
    'ngSanitize',
    'ngMessages',
    'angularMoment',
    'restangular',
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker',
    'mentio',
    'ui.select',
    'satellizer',
    'angular.filter',
    'frontend.models',
    'frontend.routes',
    'frontend.components'
  ])
  .value('googleChartApiConfig', googleChartSettings())
  .constant('moment', moment)
  .config(config)
  .run(notifyConfig)
  .run(runBlock)
  .run(inviteRunBlock)
  .run(globalAvailability)
  .filter('mentionHighlight', MentionHighlight)
  .filter('humanizeConstant', humanizeConstant)
  .service('Permissions', Permissions)
  .service('notifyError', notifyError)
  .service('unprocessableEntityText', unprocessableEntityText)
;

function globalAvailability ($rootScope, Permissions) {
  'ngInject';
  $rootScope.Permissions = Permissions;
}

function googleChartSettings() {
  return {
    version: '1',
    optionalSettings: {
      packages: ['orgchart']
    }
  };
}
