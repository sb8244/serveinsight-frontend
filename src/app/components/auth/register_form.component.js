import ngInject from '../../decorators/ng_inject';

@ngInject("Devise", "unprocessableEntityText")
class RegisterFormController {
  constructor() {
    this.credentials = {
      email: "test@test.com",
      name: "tester",
      password: "testtest",
      password_confirmation: "testtest2"
    }
  }

  submit() {
    delete this.errors;
    this.Devise.register(this.credentials).catch((err) => {
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
