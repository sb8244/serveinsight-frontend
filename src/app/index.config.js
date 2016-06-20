import { apiBase, authBase, googleClientID } from './constants';

export function config ($logProvider, $urlRouterProvider, $locationProvider, $authProvider, RestangularProvider) {
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
}
