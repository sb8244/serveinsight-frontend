import ngInject from '../../decorators/ng_inject'

@ngInject("notify")
class PassupController {
  complete(passup) {
    var promise;
    if (this.passupList) {
      promise = this.passupList.complete(passup);
    } else {
      promise = passup.complete();
    }

    promise.then(() => {
      this.notify("Complete!");
    });
  }
}

export const PassupComponent = {
  templateUrl: 'app/components/passup/passup.html',
  controllerAs: 'ctrl',
  controller: PassupController,
  bindings: {
    passup: '=',
    passupList: '=?'
  }
};
