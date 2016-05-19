class OrganizationMember {
  constructor(data, featureDefinitions) {
    _.extend(this, data);
    this.featureDefinitions = featureDefinitions;
  }

  present() {
    return this.id;
  }

  hasFeature(feature) {
    return this.featureDefinitions[feature].indexOf(this.role) >= 0;
  }
}

export function OrganizationMemberFactory($q, FeatureDefinitions, Restangular, $rootScope, $state, Organization) {
  'ngInject';

  var savedOrganizationMember = undefined;

  return {
    getCached: function() {
      return savedOrganizationMember;
    },
    get: function() {
      if (savedOrganizationMember) {
        return $q(resolve => resolve(savedOrganizationMember));
      }

      return Restangular.one("user").get().then(function(data) {
        savedOrganizationMember = new OrganizationMember(data.organization_membership, FeatureDefinitions);
        savedOrganizationMember.organization = Organization.load(data.organization);
        savedOrganizationMember.user = _.omit(data.plain(), 'organization_membership', 'organization');

        return savedOrganizationMember;
      });
    },
    getAndRedirect: function() {
      this.get().then(organzation_member => {
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
        $state.go('login');
      });
    }
  };
}
