import ngInject from '../../decorators/ng_inject';

@ngInject("Devise", "OrganizationMember", "unprocessableEntityText", "$auth", "$sessionStorage")
class LoginFormController {
  submit() {
    delete this.errors;
    this.Devise.verifyCredentials(this.credentials).then(() => {
      this.OrganizationMember.getAndRedirect();
    }).catch((err) => {
      if (err.status === 422) {
        this.errors = this.unprocessableEntityText(err);
      }
    });
  }

  google() {
    this.$auth.authenticate('google', { invite_code: this.$sessionStorage.inviteCode }).then(() => {
      delete this.$sessionStorage.inviteCode;
      this.OrganizationMember.getAndRedirect();
    });
  }
}

export const LoginFormComponent = {
  templateUrl: "app/components/auth/login_form.html",
  controllerAs: "ctrl",
  controller: LoginFormController
};
