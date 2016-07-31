import ngInject from '../../decorators/ng_inject';

@ngInject("Devise")
class ForgotPasswordFormController {
  submit() {
    delete this.result;
    this.Devise.requestNewPassword(this.email).then(() => {
      this.result = "If this email exists in Serve Insight, you'll get a password reset link soon.";
    });
  }
}

export const ForgotPasswordFormComponent = {
  templateUrl: "app/components/auth/forgot_password_form.html",
  controllerAs: "ctrl",
  controller: ForgotPasswordFormController
};
