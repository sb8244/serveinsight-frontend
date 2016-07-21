import {} from './answers/module';
import {} from './dashboard/module';
import {} from './goals/module';
import {} from './login/module';
import {} from './notifications/module';
import {} from './passups/module';
import {} from './setup/module';
import {} from './surveys/module';
import {} from './team_admin/module';
import {} from './shoutouts/module';

angular.module("frontend.routes", [
  'answers',
  'dashboard',
  'goals',
  'login',
  'notifications',
  'passups',
  'setup',
  'surveys',
  'team_admin',
  'shoutouts'
]);
