export class Permissions {
  constructor(User) {
    'ngInject';

    this.User = User;
  }

  isPassupable(item) {
    var currentUser = this.User.getCachedUser();
    return currentUser.id != item.user_id;
  }
}