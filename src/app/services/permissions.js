export class Permissions {
  constructor(OrganizationMember) {
    'ngInject';

    this.OrganizationMember = OrganizationMember;
  }

  isPassupable(item) {
    var current = this.OrganizationMember.getCached();
    return current.id != item.organization_membership_id;
  }
}
