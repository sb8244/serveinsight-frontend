import { SurveyFactory } from './survey';
import { QuickNoteFactory } from './quick_note';
import { PersonFactory } from './person';
import { OrganizationMemberFactory } from './OrganizationMember';
import { PassupFactory } from './passup';
import { FeatureDefinitions } from './feature_definitions';
import { OrganizationFactory } from './organization';
import { SurveyListFactory } from './SurveyList';

angular.module("models", [])
  .factory("Survey", SurveyFactory)
  .factory("QuickNote", QuickNoteFactory)
  .factory("Person", PersonFactory)
  .factory("OrganizationMember", OrganizationMemberFactory)
  .factory("Passup", PassupFactory)
  .factory("Organization", OrganizationFactory)
  .factory("SurveyList", SurveyListFactory)
  .constant("FeatureDefinitions", FeatureDefinitions)
;
