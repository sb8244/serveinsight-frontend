class InviteController {
  constructor() {
    this.setBlankParams();
  }

  invite() {
    this.organization.invite(this.inviteParams).then((invite) => {
      (this.afterInvite || angular.noop)({ invite: invite.plain() });
      this.setBlankParams();
    });
  }

  setBlankParams() {
    this.inviteParams = {
      email: undefined,
      name: undefined,
      admin: false
    };
  }
}

export const InviteComponent = {
  templateUrl: 'app/components/invite/invite.html',
  controller: InviteController,
  controllerAs: 'ctrl',
  bindings: {
    organization: '=',
    afterInvite: '&?',
    onCancel: '&?'
  }
};
