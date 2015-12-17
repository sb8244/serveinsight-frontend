import { SurveyFactory } from './survey';
import { QuickNoteFactory } from './quick_note';

angular.module("models", [])
  .factory("Survey", SurveyFactory)
  .factory("QuickNote", QuickNoteFactory)

;
