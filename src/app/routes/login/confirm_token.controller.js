import ngInject from '../../decorators/ng_inject';

@ngInject("$stateParams", "Devise", "$state", "OrganizationMember")
export class ConfirmTokenController {
  constructor($stateParams, Devise, $state, OrganizationMember) {
    if ($stateParams.confirmation_token) {
      Devise.confirmToken($stateParams.confirmation_token).then(() => {
        OrganizationMember.getAndRedirect();
      }).catch(() => {
        $state.go("confirm_email");
        OrganizationMember.getAndRedirect();
      });
    } else {
      $state.go("login");
    }
  }
}
