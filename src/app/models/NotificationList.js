class NotificationList {
  constructor(notifications) {
    this.notifications = notifications;
  }

  count() {
    return this.notifications.length;
  }
}

class Notification {
  constructor(data) {
    _.assign(this, data);
    console.log(data);
  }
}

export function NotificationListFactory(Restangular) {
  'ngInject';

  return {
    getList: function() {
      return Restangular.all("notifications").getList().then((data) => {
        let notifications = _.map(data.plain(), (n) => new Notification(n));
        return new NotificationList(notifications);
      });
    }
  }
}
