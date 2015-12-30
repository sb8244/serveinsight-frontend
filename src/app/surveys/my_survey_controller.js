import ngInject from '../decorators/ng_inject';

@ngInject("survey", "Survey", "$state", "QuickNote")
export class MySurveyController {
  constructor(survey, Survey, $state, QuickNote) {
    Survey.getList().then((surveyList) => {
      this.surveyList = surveyList;
    });

    QuickNote.getList().then((noteList) => {
      this.quickNoteList = noteList;
    });
  }

  surveySelected(survey) {
    this.$state.go("surveys.my_show", { id: survey.id });
  }
}
