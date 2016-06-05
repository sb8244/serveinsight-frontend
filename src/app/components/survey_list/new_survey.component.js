import ngInject from '../../decorators/ng_inject';
import { frequencyOptions } from './frequencies';

@ngInject('notify', '$state', 'EditableSurveyList')
class Controller {
  constructor() {
    this.survey = this.EditableSurveyList.emptyEditableSurvey();
    this.frequencyOptions = frequencyOptions;
  }

  save() {
    this.survey.save().then((survey) => {
      this.notify("Insight Created!");
      this.$state.go("team_admin.survey", { id: survey.id })
    });
  }
}

export const NewSurvey = {
  templateUrl: 'app/components/survey_list/edit_survey.html',
  controller: Controller,
  controllerAs: 'ctrl',
  bindings: {
    id: "="
  }
};
