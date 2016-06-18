class PassupList {
  constructor(passups) {
    this.passups = passups;
  }

  unreadCount() {
    return this.unreadPassups().length;
  }

  unreadPassups() {
    return _.select(this.passups, { read: false });
  }

  readPassups() {
    return _.select(this.passups, { read: true });
  }
}

class Passup {
  constructor(data) {
    _.extend(this, data);
  }
}

const data = _.map([{
    id: 1,
    organzation_member_id: 2,
    user_name: "John Robertson",
    content_created_at: new Date(),
    passed_by_id: 3,
    passed_by_name: "Emma Stolman",
    passed_at: new Date(),
    read: true,
    item: {
      content: "What are we going to do about the TPS reports?",
      comments: []
    }
  }, {
    id: 2,
    organzation_member_id: 3,
    user_name: "Emma Stolman",
    content_created_at: new Date(),
    passed_by_id: 2,
    passed_by_name: "John Robertson",
    passed_at: new Date(),
    read: false,
    item: {
      content: "Great job on the project engineering!",
      comments: []
    }
  }
], (data) => {
  return new Passup(data);
});

export function PassupFactory($q, Restangular) {
  'ngInject';

  return {
    getList: function() {
      return $q((resolve) => {
        resolve(new PassupList(data));
      });
    },
    createPassup: function(passup_grant) {
      return Restangular.all("passups").post({ passup_grant }).then((resp) => {
        return resp.plain();
      });
    }
  };
}
