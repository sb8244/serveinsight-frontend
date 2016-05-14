import ngInject from '../decorators/ng_inject';

@ngInject("$auth", "User")
export class LoginController {
  google() {
    this.$auth.authenticate('google').then(() => {
      this.User.getAndRedirect();
    });
  }
}
