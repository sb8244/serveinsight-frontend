import ngInject from '../../decorators/ng_inject';

@ngInject("$auth", "OrganizationMember")
export class LoginController {
  google() {
    this.$auth.authenticate('google').then(() => {
      this.OrganizationMember.getAndRedirect();
    });
  }
}
