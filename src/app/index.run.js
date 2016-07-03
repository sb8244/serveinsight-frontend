/* eslint-disable */
export function runBlock ($log, $rootScope, $stateParams, $state, OrganizationMember) {
  'ngInject';
  $rootScope.$stateParams = $stateParams;
  $rootScope.$state = $state;

  OrganizationMember.getAndRedirect();
  $log.debug('runBlock end');
}

export function inviteRunBlock($log, $location, $sessionStorage) {
  'ngInject';

  var inviteCode = $location.search()["invite"];
  if (inviteCode) {
    $sessionStorage.inviteCode = inviteCode;
    $log.debug('found invite code', inviteCode);
  } else if ($sessionStorage.inviteCode) {
    $log.debug('found EXISTING invite code', $sessionStorage.inviteCode);
  }

  $log.debug('inviteRunBlock end');
}

export function notifyConfig (notify) {
  'ngInject';

  notify.config({
    duration: 5000,
    startTop: 70,
    verticalSpacing: 14,
    position: 'right',
    maximumOpen: 3
  });
}
