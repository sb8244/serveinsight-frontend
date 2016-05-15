import ngInject from '../decorators/ng_inject';

@ngInject("Organization", "$state", "User")
export class SetupController {
  constructor(Organization, $state, User) {
    if (User.getCachedUser().organization) {
      $state.go("dashboard");
    }

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

  goToFinish() {
    this.step = "finish";
  }

  finished() {
    this.User.getAndRedirect();
  }
}
