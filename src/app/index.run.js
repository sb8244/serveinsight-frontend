export function runBlock ($log, $rootScope, $stateParams, $state, User) {
  'ngInject';
  $log.debug('runBlock end');
  $rootScope.$stateParams = $stateParams;
  $rootScope.$state = $state;

  User.get().then(function(user) {
    $rootScope.current_user = user;
    $rootScope.appState = 'main';
  }).catch(function() {
    $rootScope.appState = 'login';
    $state.go('login');
  });
}
