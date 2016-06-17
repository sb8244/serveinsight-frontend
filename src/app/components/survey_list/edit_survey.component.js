import ngInject from '../../decorators/ng_inject';
import { frequencyOptions } from './frequencies';
import { questionTypes } from './questionTypes';

@ngInject('notify', 'EditableSurveyList')
class Controller {
  constructor() {
    this.EditableSurveyList.get(this.id).then((survey) => {
      this.survey = survey;

      if (survey.data.next_due_at) {
        this.due_at_picker = {
          date: moment(survey.data.next_due_at).toDate()
        };
      }
    });

    this.frequencyOptions = frequencyOptions;
    this.questionTypes = questionTypes;
  }

  save() {
    this.survey.save().then(() => {
      this.notify("Insight Updated");
    });
  }
}

export const EditSurvey = {
  templateUrl: 'app/components/survey_list/edit_survey.html',
  controller: Controller,
  controllerAs: 'ctrl',
  bindings: {
    id: "="
  }
};
