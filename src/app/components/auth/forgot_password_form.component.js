import ngInject from '../../decorators/ng_inject';

@ngInject()
class ForgotPasswordFormController {
  submit() {

  }
}

export const ForgotPasswordFormComponent = {
  templateUrl: "app/components/auth/forgot_password_form.html",
  controllerAs: "ctrl",
  controller: ForgotPasswordFormController
};
