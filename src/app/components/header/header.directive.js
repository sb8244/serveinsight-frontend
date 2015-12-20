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

class HeaderController {
  constructor (Passup) {
    'ngInject';

    Passup.getList().then(passupList => this.unreadPassupCount = passupList.unreadCount());
  }
}
