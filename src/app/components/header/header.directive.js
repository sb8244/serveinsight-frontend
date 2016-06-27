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

@ngInject("HeaderState", "$auth", "$window", "NotificationList")
class HeaderController {
  constructor() {
    this.NotificationList.getList().then((list) => {
      this.notificationList = list;
    });
  }

  logOut() {
    this.$auth.logout();
    this.$window.location.reload();
  }

  stateLoaded() {
    return this.HeaderState.isLoaded();
  }

  markAllRead() {
    this.NotificationList.markAllRead().then(() => this.notificationList.setAllCompleted());
  }
}
