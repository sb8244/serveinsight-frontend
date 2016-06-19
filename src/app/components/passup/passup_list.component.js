import ngInject from '../../decorators/ng_inject'

@ngInject("notify")
class PassupListController {
  complete(passup) {
    this.passupList.complete(passup).then(() => {
      this.notify("Complete!");
    });
  }
}

export const PassupList = {
  templateUrl: 'app/components/passup/passup_list.html',
  controllerAs: 'ctrl',
  controller: PassupListController,
  bindings: {
    passupList: '='
  }
};
