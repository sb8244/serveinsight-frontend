class InviteController {
  constructor() {
    this.setBlankParams();
  }

  inviteUser() {
    this.organization.inviteUser(this.inviteParams).then(() => {
      this.setBlankParams();
    });
  }

  setBlankParams() {
    this.inviteParams = {
      email: undefined,
      admin: false
    };
  }
}

export const InviteComponent = {
  templateUrl: 'app/components/invite/invite.html',
  controller: InviteController,
  controllerAs: 'ctrl',
  bindings: {
    organization: '='
  }
};
