import ngInject from '../../decorators/ng_inject';

@ngInject("NotificationList")
export class NotificationsIndexController {
  constructor(NotificationList) {
    NotificationList.getList()
      .then(list => this.notificationList = list)
      .finally(() => this.listLoaded = true);
  }
}
