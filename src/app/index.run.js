export function runBlock ($log, $rootScope, $stateParams, $state, User) {
  'ngInject';
  $log.debug('runBlock end');
  $rootScope.$stateParams = $stateParams;
  $rootScope.$state = $state;

  User.getAndRedirect();
}
