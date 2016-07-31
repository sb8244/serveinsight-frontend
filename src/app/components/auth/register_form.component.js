import ngInject from '../../decorators/ng_inject';

@ngInject("Devise", "unprocessableEntityText", "OrganizationMember")
class RegisterFormController {
  constructor() {
    this.credentials = {
      email: "test@test.com",
      name: "tester",
      password: "testtest",
      password_confirmation: "testtest"
    }
  }

  submit() {
    delete this.errors;
    this.Devise.register(this.credentials).then(() => {
      this.OrganizationMember.getAndRedirect();
    }).catch((err) => {
      if (err.status === 422) {
        this.errors = this.unprocessableEntityText(err);
      }
    });
  }
}

export const RegisterFormComponent = {
  templateUrl: "app/components/auth/register_form.html",
  controllerAs: "ctrl",
  controller: RegisterFormController
};
