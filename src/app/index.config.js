export function config ($logProvider, $urlRouterProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  $urlRouterProvider.otherwise('/');
}
