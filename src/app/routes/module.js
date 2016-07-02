import {} from './dashboard/module';
import {} from './surveys/module';
import {} from './passups/module';
import {} from './login/module';
import {} from './setup/module';
import {} from './team_admin/module';
import {} from './answers/module';
import {} from './goals/module';

angular.module("frontend.routes", [
  'answers',
  'dashboard',
  'goals',
  'login',
  'passups',
  'setup',
  'surveys',
  'team_admin'
]);
