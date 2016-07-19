import ngInject from '../../decorators/ng_inject';

@ngInject("survey", "Survey", "QuickNote")
export class MySurveyController {
  constructor(survey, Survey, QuickNote) {
    Survey.getList({}).then((surveyList) => {
      this.surveyList = surveyList;
    });

    QuickNote.getList().then((noteList) => {
      this.quickNoteList = noteList;
    });
  }
}
