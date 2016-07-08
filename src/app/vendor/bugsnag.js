import { bugsnagEnabled } from '../constants';

angular.module('bugsnag', []).factory('$exceptionHandler', function () {
  return function (exception, cause) {
    if (bugsnagEnabled) {
      Bugsnag.notifyException(exception, {diagnostics:{cause: cause}});
    }
  };
});
