import { SurveyFactory } from './survey';
import { QuickNoteFactory } from './quick_note';
import { PersonFactory } from './person';

angular.module("models", [])
  .factory("Survey", SurveyFactory)
  .factory("QuickNote", QuickNoteFactory)
  .factory("Person", PersonFactory)

;
