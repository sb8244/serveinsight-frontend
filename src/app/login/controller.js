export class LoginController {
  constructor($auth, User) {
    'ngInject';

    this.$auth = $auth;
    this.User = User;
  }

  google() {
    this.$auth.authenticate('google').then(() => this.User.getAndRedirect());
  }
}
