export function NavDirective() {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'app/components/nav/nav.html',
    scope: {},
    controller: NavController,
    controllerAs: 'vm',
    bindToController: true
  }
}

class NavController {

}
