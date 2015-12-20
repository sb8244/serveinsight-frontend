class PassupList {
  constructor(passups) {
    this.passups = passups;
  }

  unreadCount() {
    return _(this.passups).select({ read: false }).size();
  }
}

class Passup {
  constructor(data) {
    _.extend(this, data);
  }
}

const data = _.map([{
    id: 1,
    user_id: 2,
    user_name: "John Robertson",
    read: true,
    content: "What are we going to do about the TPS reports?"
  }, {
    id: 2,
    user_id: 3,
    user_name: "Emma Stolman",
    read: false,
    content: "Great job on the project engineering!"
  }
], (data) => {
  return new Passup(data);
});

export function PassupFactory($q) {
  'ngInject';

  return {
    getList: function() {
      return $q((resolve) => {
        resolve(new PassupList(data));
      });
    }
  };
}