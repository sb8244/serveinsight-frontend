export function DeviseFactory(Restangular, $auth) {
  'ngInject';

  return {
    verifyCredentials: function(credentials) {
      return Restangular.one("auth/users/sign_in").customPOST({ user: credentials }).then((resp) => {
        if (resp.token) {
          $auth.setToken(resp.token);
        }
      });
    },
    register: function(credentials) {
      return Restangular.all("auth/users").customPOST({ user: credentials });
    }
  };
}
