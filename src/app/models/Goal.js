import { goalSurveyQuestion } from './survey';

class Goal {
  constructor(data) {
    _.assign(this, data);
    this.question = goalSurveyQuestion;
    this.question_type = "string";
  }
}

export function GoalFactory(Restangular) {
  'ngInject';

  return {
    find: function(id) {
      return Restangular.one("goals", id).get().then((data) => {
        return new Goal(data.plain());
      });
    }
  }
}
