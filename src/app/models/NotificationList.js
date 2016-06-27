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
  }

  uiSref() {
    if (this.notification_type === "passup") {
      return `passups.show({ id: ${this.notification_details.passup_id} })`;
    }
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
