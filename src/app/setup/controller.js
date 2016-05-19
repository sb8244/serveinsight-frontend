import ngInject from '../decorators/ng_inject';

@ngInject("Organization", "$state", "OrganizationMember")
export class SetupController {
  constructor(Organization, $state, OrganizationMember) {
    if (OrganizationMember.getCached().organization) {
      $state.go("dashboard");
    }

    this.step = "create";
    this.organizationParams = {};
    this.inviteParams = {};
  }

  createOrganization() {
    this.Organization.create(this.organizationParams).then(org => {
      this.createdOrganization = org;
      this.OrganizationMember.getCached().organization = org;
      this.step = "users";
    });
  }

  goToFinish() {
    this.step = "finish";
  }

  finished() {
    this.OrganizationMember.getAndRedirect();
  }
}
