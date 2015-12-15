export class DashboardController {
  constructor() {
    'ngInject';

    this.stats = {
      due_surveys: 1,
      pending_pass_ups: 3,
      shout_outs: 4
    };

    this.recent_shoutouts = [
      {
        created_at: new Date() - 1000000,
        teammate_name: "John Smith",
        comment: "@Steve really excelled this week at coding."
      },
      {
        created_at: new Date() - 231231231,
        teammate_name: "Max Patrickson",
        comment: "@Steve really excelled this week at coding."
      },
      {
        created_at: new Date() - 1239391828,
        teammate_name: "Claire Beaumont",
        comment: "@Steve really excelled this week at coding."
      }
    ];
  }
}
