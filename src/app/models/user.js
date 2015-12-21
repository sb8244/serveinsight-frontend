class User {
  constructor(data, featureDefinitions) {
    _.extend(this, data);
    this.featureDefinitions = featureDefinitions;
    this.name = this.first_name + " " + this.last_name;
  }

  hasFeature(feature) {
    return this.featureDefinitions[feature].indexOf(this.role) >= 0;
  }
}

export function UserFactory($q, FeatureDefinitions, Restangular) {
  'ngInject';

  var savedUser = undefined;

  return {
    getCachedUser: function() {
      return savedUser;
    },
    get: function() {
      if (savedUser) {
        return $q(resolve => resolve(savedUser));
      }

      return Restangular.one("user").get().then(function(data) {
        savedUser = new User(data, FeatureDefinitions);
        return savedUser;
      });
    }
  };
}
