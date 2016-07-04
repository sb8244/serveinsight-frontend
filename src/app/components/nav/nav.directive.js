import ngInject from '../../decorators/ng_inject';

export function NavDirective() {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'app/components/nav/nav.html',
    scope: {},
    controller: NavController,
    controllerAs: 'ctrl',
    bindToController: true
  }
}

@ngInject("HeaderState")
class NavController {
}
