export class HeaderState {
  constructor (Passup, Survey) {
    'ngInject';

    this.Passup = Passup;
    this.Survey = Survey;
    this.loaded = {
      unreadPassupCount: false,
      dueSurveyCount: false,
      reviewableCount: false
    };
    this.updateUnreadPassupCount();
    this.updateDueSurveyCount();
    this.updateReviewableCount();
  }

  isLoaded() {
    return _.all(this.loaded);
  }

  updateUnreadPassupCount() {
    this.Passup.getList().
      then(list => this.unreadPassupCount = list.count()).
      finally(() => this.loaded.unreadPassupCount = true);
  }

  updateDueSurveyCount() {
    this.Survey.getList().
      then(list => {
        this.dueSurveyCount = list.dueCount({ daysUntilDue: 2 });
        this.surveyCount = list.count();
      }).
      finally(() => this.loaded.dueSurveyCount = true);
  }

  updateReviewableCount() {
    this.Survey.getReviewableList().
      then(list => this.reviewableCount = list.count()).
      finally(() => this.loaded.reviewableCount = true);
  }
}
