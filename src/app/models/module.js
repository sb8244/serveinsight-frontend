import { SurveyFactory } from './survey';
import { QuickNoteFactory } from './quick_note';
import { PersonFactory } from './person';
import { OrganizationMemberFactory } from './OrganizationMember';
import { PassupFactory } from './passup';
import { FeatureDefinitions } from './feature_definitions';
import { OrganizationFactory } from './organization';
import { EditableSurveyListFactory } from './EditableSurveyList';
import { CommentFactory } from './comment';
import { NotificationListFactory } from './NotificationList';
import { AnswerFactory } from './Answer';
import { GoalFactory } from './Goal';
import { ShoutoutFactory } from './Shoutout';

angular.module("frontend.models", [])
  .factory("Answer", AnswerFactory)
  .factory("Goal", GoalFactory)
  .factory("Survey", SurveyFactory)
  .factory("QuickNote", QuickNoteFactory)
  .factory("Person", PersonFactory)
  .factory("OrganizationMember", OrganizationMemberFactory)
  .factory("Passup", PassupFactory)
  .factory("Organization", OrganizationFactory)
  .factory("EditableSurveyList", EditableSurveyListFactory)
  .factory("Comment", CommentFactory)
  .factory("NotificationList", NotificationListFactory)
  .factory("Shoutout", ShoutoutFactory)
  .constant("FeatureDefinitions", FeatureDefinitions)
;
