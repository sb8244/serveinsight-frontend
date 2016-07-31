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

        if (organzation_member.organization && ($state.current.name === 'login' || $state.current.name === 'setup')) {
          $state.go('dashboard');
        } else if (!organzation_member.organization) {
          $rootScope.appState = 'setup';
          $state.go('setup_wizard');
        }
      }).catch(function() {
        $rootScope.current_organzation_member = null;
        savedOrganizationMember = null;
        $rootScope.appState = 'login';

        if (!$state.current.login_route) {
          $state.go('login');
        }
      });
    }
  };
}
