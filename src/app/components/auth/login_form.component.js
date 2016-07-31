import ngInject from '../../decorators/ng_inject';

@ngInject("Devise", "OrganizationMember", "unprocessableEntityText")
class LoginFormController {
  constructor() {
    this.credentials = {
      email: "test@test.com2",
      password: "testtest"
    };
  }

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
}

export const LoginFormComponent = {
  templateUrl: "app/components/auth/login_form.html",
  controllerAs: "ctrl",
  controller: LoginFormController
};
