import ngInject from '../../decorators/ng_inject';

export function HeaderDirective() {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'app/components/header/header.html',
    scope: {},
    controller: HeaderController,
    controllerAs: 'ctrl',
    bindToController: true
  };
}

@ngInject("HeaderState", "$auth", "$window")
class HeaderController {
  logOut() {
    this.$auth.logout();
    this.$window.location.reload();
  }
}
