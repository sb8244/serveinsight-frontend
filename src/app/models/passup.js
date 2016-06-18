class PassupList {
  constructor(passups) {
    this.passups = passups;
  }

  count() {
    return this.passups.length;
  }
}

class Passup {
  constructor(data) {
    _.extend(this, data);
  }
}

export function PassupFactory(Restangular) {
  'ngInject';

  return {
    getList: function() {
      return Restangular.all("passups").getList().then((data) => {
        return new PassupList(data.plain());
      })
    },
    createPassup: function(passup_grant) {
      return Restangular.all("passups").post({ passup_grant }).then((resp) => {
        return resp.plain();
      });
    }
  };
}
