import ngInject from '../../decorators/ng_inject'

@ngInject("$state")
class WrappedSurveyController {
  surveySelected(survey) {
    this.$state.go("surveys.my_show", { id: survey.id });
  }
}

export const WrappedSurvey = {
  templateUrl: 'app/components/survey/wrapped_survey.html',
  controllerAs: 'ctrl',
  controller: WrappedSurveyController,
  bindings: {
    survey: '=',
    surveyList: '=?',
    quickNoteList: '=?',
    reviewing: '@?'
  }
};
