export function AutofocusDirective($timeout) {
  'ngInject';

  return {
    restrict: 'A',
    link : ($scope, $element) => {
      $timeout(function() {
        $element[0].focus();
      });
    }
  }
}