/* eslint-disable */
export function runBlock ($log, $rootScope, $stateParams, $state, OrganizationMember) {
  'ngInject';
  $log.debug('runBlock end');
  $rootScope.$stateParams = $stateParams;
  $rootScope.$state = $state;

  OrganizationMember.getAndRedirect();
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
