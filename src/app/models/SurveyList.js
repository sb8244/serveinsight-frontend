let data = [
  {
    id: 1,
    creator: "Steve Bussey",
    name: "Weekly Insights Report",
    users_in_scope: 34,
    responses: 215,
    created_at: moment().subtract(5, "months").toJSON(),
    active: true,
    recurring: true,
    goals_section: true,
    questions: [
      {
        id: 1,
        question: "Is there anyone this week you'd like to highlight for embodying our core values?",
      }, {
        id: 2,
        question: "What's going well? Any wins ( big or little) this week?",
      }, {
        id: 3,
        question: "What challenges are you facing? Where are you stuck?",
      }
    ]
  },
  {
    id: 2,
    creator: "Brian Culler",
    name: "Weekly Insights Report",
    users_in_scope: 34,
    responses: 215,
    created_at: moment().subtract(5, "months").toJSON(),
    active: false,
    recurring: true,
    goals_section: false,
    questions: []
  }
];

class EditableSurvey {
  constructor(data) {
    _.extend(this, data);
  }

  moveQuestion(index, change) {
    var newIndex = index + change;
    var question = this.removeQuestion(index);
    this.questions.splice(newIndex, 0, question);
  }

  removeQuestion(index) {
    return _.pullAt(this.questions, index)[0];
  }

  addQuestion() {
    this.questions.push({
      id: null,
      question: ""
    });
  }
}

export function SurveyListFactory($q) {
  'ngInject';

  return {
    getList: function() {
      return $q(function(resolve) {
        resolve(data);
      });
    },
    get: function(id) {
      return $q(function(resolve) {
        let survey = _.find(data, { id: parseInt(id) });
        resolve(new EditableSurvey(survey));
      });
    }
  };
}
