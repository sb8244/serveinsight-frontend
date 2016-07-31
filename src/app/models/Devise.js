export function DeviseFactory(Restangular, $auth, $sessionStorage) {
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
      credentials.invite_code = $sessionStorage.inviteCode;

      return Restangular.all("auth/users").customPOST({ user: credentials }).then((resp) => {
        if (resp.token) {
          $auth.setToken(resp.token);
        }
      });
    },
    resendConfirmation: function() {
      return Restangular.all("auth/users/confirmation/resend").customPOST({});
    },
    confirmToken: function(token) {
      return Restangular.all("auth/users").customGET("confirmation", { confirmation_token: token }).then((resp) => {
        if (resp.token) {
          $auth.setToken(resp.token);
        }
      });
    }
  };
}
