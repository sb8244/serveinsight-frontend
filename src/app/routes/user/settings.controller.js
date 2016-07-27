import ngInject from '../../decorators/ng_inject';

@ngInject("member", "notify", "OrganizationMember")
export class UserSettingsController {
  save() {
    this.member.save().then(() => {
      this.OrganizationMember.getClean().then((member) => {
        this.member = member;
        this.notify("Setting Updated!");
      });
    });
  }
}
