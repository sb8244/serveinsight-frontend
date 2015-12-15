export function HeaderDirective() {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'app/components/header/header.html',
    scope: {},
    controller: HeaderController,
    controllerAs: 'vm',
    bindToController: true
  };
}

class HeaderController {
  constructor () {
    'ngInject';
  }
}
