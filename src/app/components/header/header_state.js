export class HeaderState {
  constructor (Passup, Survey) {
    'ngInject';

    this.Passup = Passup;
    this.Survey = Survey;

    this.updateUnreadPassupCount();
    this.updateDueSurveyCount();
    this.updateReviewableCount();
  }

  updateUnreadPassupCount() {
    this.Passup.getList().then(list => this.unreadPassupCount = list.unreadCount());
  }

  updateDueSurveyCount() {
    this.Survey.getList().then(list => this.dueSurveyCount = list.dueCount());
  }

  updateReviewableCount() {
    this.Survey.getReviewableList().then(list => this.reviewableCount = list.count());
  }
}
