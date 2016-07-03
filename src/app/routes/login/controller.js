import ngInject from '../../decorators/ng_inject';

@ngInject("$auth", "OrganizationMember", "$sessionStorage")
export class LoginController {
  google() {
    this.$auth.authenticate('google', { invite_code: this.$sessionStorage.inviteCode }).then(() => {
      delete this.$sessionStorage.inviteCode;
      this.OrganizationMember.getAndRedirect();
    });
  }
}
