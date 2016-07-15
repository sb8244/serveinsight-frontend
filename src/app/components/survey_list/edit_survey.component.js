import ngInject from '../../decorators/ng_inject';
import { frequencyOptions } from './frequencies';
import { questionTypes } from './questionTypes';
import { dateTimePickerWatch } from '../../services/dateTimePickerWatch';

@ngInject('$scope', 'EditableSurveyList', 'notify', '$state')
class Controller {
  constructor($scope, EditableSurveyList) {
    EditableSurveyList.get(this.id).then((survey) => {
      this.survey = survey;

      if (survey.data.next_due_at) {
        this.due_at_picker = {
          date: moment(survey.data.next_due_at).toDate()
        };
      }
    });

    this.frequencyOptions = frequencyOptions;
    this.questionTypes = questionTypes;

    dateTimePickerWatch(this, $scope, "ctrl.due_at_picker.date");
  }

  save() {
    this.survey.save().then(() => {
      this.notify("Insight Updated");
      this.$state.go('.', {}, { reload: true });
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
