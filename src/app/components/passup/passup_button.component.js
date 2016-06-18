import ngInject from '../../decorators/ng_inject'

@ngInject("Permissions", "Passup", "notify", "notifyError")
class PassupButtonController {
  passup() {
    this.Passup.createPassup(this.passupable.passup_grant).then(() => {
      this.notify("Passed up");
    }).catch((err) => {
      if (err.status === 422) {
        this.notifyError(err);
      }
    });
  }

  isPassupable() {
    return this.Permissions.isPassupable(this.passupable) && this.passupable.passup_grant;
  }
}

export const PassupButton = {
  templateUrl: 'app/components/passup/passup_button.html',
  controllerAs: 'ctrl',
  controller: PassupButtonController,
  bindings: {
    passupable: '='
  }
};
