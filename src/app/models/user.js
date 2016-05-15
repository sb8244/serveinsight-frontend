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

export function UserFactory($q, FeatureDefinitions, Restangular, $rootScope, $state, Organization) {
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
        data.organization = Organization.load(data.organization);
        savedUser = new User(data.plain(), FeatureDefinitions);
        return savedUser;
      });
    },
    getAndRedirect: function() {
      this.get().then(user => {
        $rootScope.current_user = user;
        $rootScope.appState = 'main';

        if (user.organization && ($state.current.name === 'login' || $state.current.name === 'setup')) {
          $state.go('dashboard');
        } else if (!user.organization) {
          $rootScope.appState = 'setup';
          $state.go('setup_wizard');
        }
      }).catch(function() {
        $rootScope.current_user = null;
        savedUser = null;
        $rootScope.appState = 'login';
        $state.go('login');
      });
    }
  };
}
