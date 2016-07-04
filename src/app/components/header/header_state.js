export class HeaderState {
  constructor (Passup, Survey) {
    'ngInject';

    this.Passup = Passup;
    this.Survey = Survey;
    this.loadedCount = 0;
    this.updateUnreadPassupCount();
    this.updateDueSurveyCount();
    this.updateReviewableCount();
  }

  isLoaded() {
    return this.loadedCount === 3;
  }

  updateUnreadPassupCount() {
    this.Passup.getList().
      then(list => this.unreadPassupCount = list.count()).
      finally(() => this.loadedCount += 1);
  }

  updateDueSurveyCount() {
    this.Survey.getList().
      then(list => this.dueSurveyCount = list.dueCount({ daysUntilDue: 2 })).
      finally(() => this.loadedCount += 1);
  }

  updateReviewableCount() {
    this.Survey.getReviewableList().
      then(list => this.reviewableCount = list.count()).
      finally(() => this.loadedCount += 1);
  }
}
