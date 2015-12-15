export function runBlock ($log, $rootScope, $stateParams, $state) {
  'ngInject';
  $log.debug('runBlock end');
  $rootScope.$stateParams = $stateParams;
  $rootScope.$state = $state;
}
