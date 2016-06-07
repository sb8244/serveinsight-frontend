export const WrappedSurvey = {
  templateUrl: 'app/components/survey/wrapped_survey.html',
  controllerAs: 'ctrl',
  replace: true,
  bindings: {
    survey: '=',
    surveyList: '=?',
    quickNoteList: '=?',
    reviewing: '@?'
  }
};
