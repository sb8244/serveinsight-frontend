export function config ($logProvider, $urlRouterProvider, $locationProvider, $authProvider, RestangularProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  RestangularProvider.setBaseUrl('http://localhost.serveinsight.com:8000/api');
  RestangularProvider.setRequestSuffix('.json');

  $authProvider.baseUrl = 'http://localhost.serveinsight.com:8000/';
  $authProvider.google({
    url: '/auth/google_oauth2/callback',
    clientId: '853844444042-u5hib4hobh7nj0b6j41kbbjqe8hg3hkc.apps.googleusercontent.com'
  });
}
