/* global moment:false */

import {} from './dashboard/module';
import {} from './surveys/module';
import {} from './models/module';
import {} from './passups/module';
import {} from './login/module';
import {} from './setup/module';
import {} from './team_admin/module';

import { config } from './index.config';
import { runBlock, notifyConfig } from './index.run';
import { HeaderDirective } from './components/header/header.directive';
import { NavDirective } from './components/nav/nav.directive';
import { CustomScrollbarDirective } from './components/custom_scrollbar/directive';
import { SurveyDirective } from './components/survey/survey.directive';
import { SurveyAnswerDirective } from './components/survey/answer.directive';
import { SurveyGoalDirective } from './components/survey/goal.directive';
import { CommentsDirective } from './components/comments/comments.directive';
import { Permissions } from './services/permissions';
import { AutofocusDirective } from './components/autofocus/directive';
import { FooterController } from './components/footer/controller';
import { InviteComponent } from './components/invite/invite.directive';
import { OrgChartComponent } from './components/org_chart/org_chart.component';
import { AdminSurveyList } from './components/survey_list/admin_survey_list.component';
import { EditSurvey } from './components/survey_list/edit_survey.component';
import { NewSurvey } from './components/survey_list/new_survey.component';
import { SurveyListRow } from './components/survey_list/row.component';
import { EmptyState } from './components/empty_state/empty_state.component';

angular.module('frontend',
  [
    'cgNotify',
    'googlechart',
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngMessages',
    'angularMoment',
    'restangular',
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker',
    'mentio',
    'ui.select',
    'satellizer',
    'models',
    'dashboard',
    'surveys',
    'passups',
    'login',
    'setup',
    'team_admin'
  ])
  .constant('moment', moment)
  .config(config)
  .run(notifyConfig)
  .run(runBlock)
  .run(globalAvailability)
  .directive('appHeader', HeaderDirective)
  .directive('appNav', NavDirective)
  .directive('customScrollbar', CustomScrollbarDirective)
  .directive('survey', SurveyDirective)
  .directive('surveyAnswer', SurveyAnswerDirective)
  .directive('surveyGoal', SurveyGoalDirective)
  .directive('comments', CommentsDirective)
  .directive('autofocus', AutofocusDirective)
  .component('inviteForm', InviteComponent)
  .component('orgChart', OrgChartComponent)
  .component('adminSurveyList', AdminSurveyList)
  .component('editSurvey', EditSurvey)
  .component('newSurvey', NewSurvey)
  .component('surveyListRow', SurveyListRow)
  .component('emptyState', EmptyState)
  .service('Permissions', Permissions)
  .controller('FooterController', FooterController)
  .value('googleChartApiConfig', googleChartSettings())
;

function globalAvailability ($rootScope, Permissions) {
  'ngInject';
  $rootScope.Permissions = Permissions;
}

function googleChartSettings() {
  return {
    version: '1',
    optionalSettings: {
      packages: ['orgchart']
    }
  };
}
