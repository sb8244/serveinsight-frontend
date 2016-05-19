export class Permissions {
  constructor(OrganizationMember) {
    'ngInject';

    this.OrganizationMember = OrganizationMember;
  }

  isPassupable(item) {
    var current = this.OrganizationMember.getCached();
    return current.id != item.organzation_member_id;
  }
}
