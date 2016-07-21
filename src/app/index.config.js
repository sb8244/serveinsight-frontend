import { apiBase, authBase, googleClientID, bugsnagEnabled } from './constants';

if (window.Bugsnag) { // eslint-disable-line
  Bugsnag.beforeNotify = () => bugsnagEnabled;
}

export function config ($logProvider, $urlRouterProvider, $locationProvider, $authProvider, RestangularProvider, cfpLoadingBarProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  RestangularProvider.setBaseUrl(apiBase);
  RestangularProvider.setRequestSuffix('.json');

  $authProvider.baseUrl = authBase;
  $authProvider.google({
    url: '/auth/google_oauth2/callback',
    clientId: googleClientID
  });

  cfpLoadingBarProvider.includeSpinner = false;
}
