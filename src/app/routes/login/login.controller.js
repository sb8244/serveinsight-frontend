import ngInject from '../../decorators/ng_inject';

@ngInject("$stateParams")
export class LoginController {
  allowed() {
    return true;
  }
}
