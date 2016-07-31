class OrganizationMember {
  constructor(data, featureDefinitions, Restangular) {
    _.extend(this, data);
    this.featureDefinitions = featureDefinitions;
    this.Restangular = Restangular;
  }

  present() {
    return this.id;
  }

  hasFeature(feature) {
    return this.featureDefinitions[feature].indexOf(this.role) >= 0;
  }

  save() {
    let data = {
      name: this.name,
      email: this.email
    };

    return this.Restangular.one("organization_membership").put(data);
  }
}

export function OrganizationMemberFactory($q, FeatureDefinitions, Restangular, $rootScope, $state, Organization) {
  'ngInject';

  var savedOrganizationMember = undefined;

  return {
    getCached: function() {
      return savedOrganizationMember;
    },
    get: function(forceFresh) {
      if (!forceFresh && savedOrganizationMember) {
        return $q(resolve => resolve(savedOrganizationMember));
      }

      return Restangular.one("user").get().then(function(data) {
        savedOrganizationMember = new OrganizationMember(data.organization_membership, FeatureDefinitions, null);
        savedOrganizationMember.organization = Organization.load(data.organization);
        savedOrganizationMember.user = _.omit(data.plain(), 'organization_membership', 'organization');

        return savedOrganizationMember;
      });
    },
    getClean: function() {
      return Restangular.one("user").get().then(function(data) {
        let savedOrganizationMember = new OrganizationMember(data.organization_membership, FeatureDefinitions, Restangular);
        savedOrganizationMember.organization = Organization.load(data.organization);
        savedOrganizationMember.user = _.omit(data.plain(), 'organization_membership', 'organization');

        return savedOrganizationMember;
      });
    },
    getAndRedirect: function() {
      this.get(true).then(organzation_member => {
        $rootScope.current_organzation_member = organzation_member;
        $rootScope.appState = 'main';

        if (organzation_member.organization && ($state.current.login_route || $state.current.confirm_route || $state.current.name === 'setup')) {
          $state.go('dashboard');
        } else if (!organzation_member.organization) {
          $rootScope.appState = 'setup';
          $state.go('setup_wizard');
        }
      }).catch(function(err) {
        if (err.status === 401) {
          $rootScope.appState = 'login';
          savedOrganizationMember = null;

          if ($state.current.name === "confirm_token") {
            return;
          } else if (err.data.error === "logged_out") {
            $rootScope.current_organzation_member = null;

            if (!$state.current.login_route) {
              $state.go('login');
            }
          } else if (err.data.error === "email_not_confirmed") {
            $rootScope.current_organzation_member = {
              email: err.data.email
            };

            if (!$state.current.confirm_route) {
              $state.go('confirm_email');
            }
          }
        }
      });
    }
  };
}
