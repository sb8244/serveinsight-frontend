class User {
  constructor(data, featureDefinitions) {
    _.extend(this, data);
    this.featureDefinitions = featureDefinitions;
  }

  hasFeature(feature) {
    return this.featureDefinitions[feature].indexOf(this.role) >= 0;
  }
}

const data = {
  id: 1,
  name: "Steve Bussey",
  email: "steve@salesloft.com",
  role: "manager",
  admin: true
};

export function UserFactory($q, FeatureDefinitions) {
  'ngInject';

  return {
    get: function() {
      return $q((resolve) => {
        resolve(new User(data, FeatureDefinitions));
      });
    }
  };
}