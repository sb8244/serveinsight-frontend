import ngInject from '../../decorators/ng_inject';
import { frequencyOptions } from './frequencies';
import { questionTypes } from './questionTypes';
import { dateTimePickerWatch } from '../../services/dateTimePickerWatch';

@ngInject('$scope', 'EditableSurveyList', 'notify', '$state')
class Controller {
  constructor($scope, EditableSurveyList) {
    this.survey = EditableSurveyList.emptyEditableSurvey();
    this.frequencyOptions = frequencyOptions;
    this.questionTypes = questionTypes;

    this.due_at_picker = {
      date: moment().day(7+5).hour(12+5).minute(0).second(0).toDate()
    };
    this.survey.setFirstDueAt(this.due_at_picker.date);

    dateTimePickerWatch(this, $scope, "ctrl.due_at_picker.date");
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
