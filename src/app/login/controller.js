export class LoginController {
  constructor($auth, $rootScope, User) {
    'ngInject';

    this.$auth = $auth;
    this.$rootScope = $rootScope;
    this.User = User;
  }

  google() {
    this.$auth.authenticate('google').then(() => {
      this.User.get().then(user => {
        this.$rootScope.current_user = user;
        this.$rootScope.appState = 'main';
      });
    });
  }
}
