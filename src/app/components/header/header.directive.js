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
  constructor (Passup, Survey) {
    'ngInject';

    Passup.getList().then(list => this.unreadPassupCount = list.unreadCount());
    Survey.getList().then(list => this.dueSurveyCount = list.dueCount());
  }
}
