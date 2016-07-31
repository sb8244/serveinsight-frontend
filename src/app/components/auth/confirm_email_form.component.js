import ngInject from '../../decorators/ng_inject';

@ngInject("Devise", "$auth", "$state")
class ConfirmEmailFormController {
  submit() {
    this.Devise.resendConfirmation().then(() => {
      this.result = "Look in your inbox for the new confirmation email";
    });
  }

  logOut() {
    this.$auth.logout();
    this.$state.go("login");
  }
}

export const ConfirmEmailFormComponent = {
  templateUrl: "app/components/auth/confirm_email_form.html",
  controllerAs: "ctrl",
  controller: ConfirmEmailFormController
};
