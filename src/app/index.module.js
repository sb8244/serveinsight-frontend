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
import { HeaderState } from './components/header/header_state';
import { NavDirective } from './components/nav/nav.directive';
import { CustomScrollbarDirective } from './components/custom_scrollbar/directive';
import { SurveyDirective } from './components/survey/survey.directive';
import { SurveyComment } from './components/survey/survey-comment.component';
import { WrappedSurvey } from './components/survey/wrapped_survey.component';
import { SurveyAnswerDirective } from './components/survey/answer.directive';
import { SurveyGoalDirective } from './components/survey/goal.directive';
import { CommentsDirective } from './components/comments/comments.directive';
import { Permissions } from './services/permissions';
import { notifyError } from './services/notifyError';
import { AutofocusDirective } from './components/autofocus/directive';
import { FooterController } from './components/footer/controller';
import { InviteComponent } from './components/invite/invite.directive';
import { OrgChartComponent } from './components/org_chart/org_chart.component';
import { AdminSurveyList } from './components/survey_list/admin_survey_list.component';
import { EditSurvey } from './components/survey_list/edit_survey.component';
import { NewSurvey } from './components/survey_list/new_survey.component';
import { SurveyListRow } from './components/survey_list/row.component';
import { CompletedSurveyList } from './components/survey_list/completed_survey_list.component';
import { ReportsCompletedSurveyList } from './components/survey_list/reports_completed_survey_list.component';
import { EmptyState } from './components/empty_state/empty_state.component';
import { MentionHighlight } from './filters/mention_highlight';
import { PassupButton } from './components/passup/passup_button.component';
import { PassupList } from './components/passup/passup_list.component';

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
    'angular.filter',
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
  .filter('mentionHighlight', MentionHighlight)
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
  .component('completedSurveyList', CompletedSurveyList)
  .component('reportsCompletedSurveyList', ReportsCompletedSurveyList)
  .component('emptyState', EmptyState)
  .component('wrappedSurvey', WrappedSurvey)
  .component('surveyComment', SurveyComment)
  .component('passupButton', PassupButton)
  .component('passupList', PassupList)
  .service('Permissions', Permissions)
  .service('HeaderState', HeaderState)
  .service('notifyError', notifyError)
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
