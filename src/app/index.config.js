export function config ($logProvider, $urlRouterProvider, $locationProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
}
