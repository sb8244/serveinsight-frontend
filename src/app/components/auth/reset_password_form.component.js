import ngInject from '../../decorators/ng_inject';

@ngInject("Devise", "$stateParams", "$state", "notify", "unprocessableEntityText")
class ResetPasswordFormController {
  constructor() {
    if (!this.$stateParams.reset_password_token) {
      this.errors = ["You do not have a password reset token in the url."];
    }
  }

  submit() {
    this.Devise.resetPassword(this.credentials, this.$stateParams.reset_password_token).then(() => {
      this.$state.go("login");
      this.notify("Success! Just login one more time.");
    }).catch((err) => {
      if (err.status === 422) {
        this.errors = this.unprocessableEntityText(err);
      }
    });
  }
}

export const ResetPasswordFormComponent = {
  templateUrl: "app/components/auth/reset_password_form.html",
  controllerAs: "ctrl",
  controller: ResetPasswordFormController
};
