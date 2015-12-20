import { SurveyFactory } from './survey';
import { QuickNoteFactory } from './quick_note';
import { PersonFactory } from './person';
import { UserFactory } from './user';
import { PassupFactory } from './passup';
import { FeatureDefinitions } from './feature_definitions';

angular.module("models", [])
  .factory("Survey", SurveyFactory)
  .factory("QuickNote", QuickNoteFactory)
  .factory("Person", PersonFactory)
  .factory("User", UserFactory)
  .factory("Passup", PassupFactory)
  .constant("FeatureDefinitions", FeatureDefinitions)
;
