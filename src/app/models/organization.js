class Organization {
  constructor(data, Restangular) {
    _.extend(this, data);
    this.Restangular = Restangular;
  }

  inviteUser(params) {
    return this.Restangular.all("invites").customPOST(params);
  }
}

export function OrganizationFactory(Restangular) {
  'ngInject';

  let load = (data) => {
    if (data) {
      return new Organization(data, Restangular);
    }
  };

  return {
    load: load,
    get: function() {
      return Restangular.all("organization").customGET().then(load);
    },
    create: function(params) {
      return Restangular.all("organization").customPOST(params).then(load);
    }
  };
}
