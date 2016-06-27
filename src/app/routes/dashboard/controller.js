import ngInject from '../../decorators/ng_inject';

@ngInject("Person")
export class DashboardController {
  constructor(Person) {
    this.stats = {
      due_surveys: 1,
      pending_pass_ups: 3,
      shout_outs: 4
    };

    Person.getList().then(personList => {
      this.people = personList.people;
    });

    this.recent_shoutouts = [
      {
        created_at: new Date() - 1000000,
        teammate_name: "John Smith",
        comment: "@Steve got the TPS reports to me in record time!"
      },
      {
        created_at: new Date() - 231231231,
        teammate_name: "Max Patrickson",
        comment: "Pairing with @Bill and @Steve this week was super productive"
      },
      {
        created_at: new Date() - 1239391828,
        teammate_name: "Claire Beaumont",
        comment: "@Steve really excelled this week at coding."
      }
    ];
  }
}
