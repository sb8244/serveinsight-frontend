export class MySurveyController {
  constructor(survey, Survey, $state, QuickNote) {
    'ngInject';

    this.$state = $state;
    this.survey = survey;

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
