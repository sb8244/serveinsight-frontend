export class SetupController {
  constructor(Organization, $state, User) {
    'ngInject';

    if (User.getCachedUser().organization) {
      $state.go("dashboard");
    }

    this.Organization = Organization;
    this.User = User;
    this.step = "create";
    this.organizationParams = {};
    this.inviteParams = {};
  }

  createOrganization() {
    this.Organization.create(this.organizationParams).then(org => {
      this.createdOrganization = org;
      this.User.getCachedUser().organization = org;
      this.step = "users";
    });
  }

  inviteUser() {
    this.createdOrganization.inviteUser(this.inviteParams).then(() => {
      this.inviteParams = {};
    });
  }

  goToFinish() {
    this.step = "finish";
  }

  finished() {
    this.User.getAndRedirect();
  }
}
