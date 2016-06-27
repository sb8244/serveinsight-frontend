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

  /*
   * Passups, reviews, answer comments, goal comments, instance comments, answer mention, goal mention, comment mention
   */
  uiSref() {
    var detailType = this.notification_details.commentable_type || this.notification_details.mentionable_type;
    var detailId = this.notification_details.commentable_id || this.notification_details.mentionable_id;

    if (this.notification_type === "passup") {
      return `passups.show({ id: ${this.notification_details.passup_id} })`;
    } else if (this.notification_type === "review") {
      return `surveys.reports_show({ id: ${this.notification_details.survey_instance_id} })`;
    } else if (detailType === "Answer") {
      return `answers_show({ id: ${detailId} })`;
    } else if (detailType === "SurveyInstance") {
      return `surveys.completed_show({ id: ${detailId} })`;
    } else if (detailType === "Goal") {
      return `goals_show({ id: ${detailId} })`;
    }

    return "dashboard";
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
