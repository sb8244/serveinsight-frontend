import { HeaderDirective } from './header/header.directive';
import { HeaderState } from './header/header_state';
import { NavDirective } from './nav/nav.directive';
import { CustomScrollbarDirective } from './custom_scrollbar/directive';
import { SurveyDirective } from './survey/survey.directive';
import { WrappedSurvey } from './survey/wrapped_survey.component';
import { SurveyAnswerDirective } from './survey/answer.directive';
import { SurveyGoalDirective } from './survey/goal.directive';
import { CommentsDirective } from './comments/comments.directive';
import { FooterController } from './footer/controller';
import { InviteComponent } from './invite/invite.directive';
import { OrgChartComponent } from './org_chart/org_chart.component';
import { AdminSurveyList } from './survey_list/admin_survey_list.component';
import { EditSurvey } from './survey_list/edit_survey.component';
import { NewSurvey } from './survey_list/new_survey.component';
import { SurveyListRow } from './survey_list/row.component';
import { CompletedSurveyList } from './survey_list/completed_survey_list.component';
import { ReportsCompletedSurveyList } from './survey_list/reports_completed_survey_list.component';
import { EmptyState } from './empty_state/empty_state.component';
import { PassupButton } from './passup/passup_button.component';
import { PassupList } from './passup/passup_list.component';
import { PassupComponent } from './passup/passup.component';
import { NotificationList } from './notifications/notification_list.component';
import { SingleShoutoutComponent } from './shoutout/single_shoutout.component';
import { RelatedInsightsComponent } from './survey/related_insights.component';
import { confirmationNeeded } from './confirm_click';
import { LoginFormComponent } from './auth/login_form.component';

angular.module("frontend.components", [])
  .service('HeaderState', HeaderState)
  .controller('FooterController', FooterController)
  .directive('appHeader', HeaderDirective)
  .directive('appNav', NavDirective)
  .directive('customScrollbar', CustomScrollbarDirective)
  .directive('survey', SurveyDirective)
  .directive('surveyAnswer', SurveyAnswerDirective)
  .directive('surveyGoal', SurveyGoalDirective)
  .directive('comments', CommentsDirective)
  .directive('confirmationNeeded', confirmationNeeded)
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
  .component('passupButton', PassupButton)
  .component('passupList', PassupList)
  .component('passup', PassupComponent)
  .component('notificationList', NotificationList)
  .component('singleShoutout', SingleShoutoutComponent)
  .component('relatedInsights', RelatedInsightsComponent)
  .component('loginForm', LoginFormComponent);
