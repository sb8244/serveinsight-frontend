import ngInject from '../../decorators/ng_inject';

@ngInject("Person", "Shoutout", "Survey", "notifyError", "notify")
export class DashboardController {
  constructor(Person, Shoutout, Survey) {
    this.stats = {
      due_surveys: 1,
      pending_pass_ups: 3,
      shout_outs: 4
    };

    Person.getList().then(personList => {
      this.people = personList.people;
    });

    Shoutout.getList({}).then(shoutoutList => {
      shoutoutList.limitedTo = 5;
      this.shoutoutList = shoutoutList;
    });

    Survey.getList({}).then(surveyList => {
      this.surveyList = surveyList.upcomingDueSurveyList();
    });
  }

  createShoutout() {
    this.Shoutout.createShoutout(this.tempShoutout).then(() => {
      this.tempShoutout = "";
      this.notify("Thanks for sharing!");
    }).catch((err) => {
      if (err.status === 422) {
        this.notifyError(err);
      }
    });
  }
}
