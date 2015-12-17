class SurveyList {
  constructor(surveys) {
    this.surveys = surveys;
  }
}

class Survey {
  constructor(data) {
    _.extend(this, data);
  }
}

const data = _.map([{
  id: 1,
  title: "Weekly Survey 12/15",
  completed: false,
  questions: [{
    id: 1,
    question: "Is there anyone this week you'd like to highlight for embodying our core values?",
    answers: [{
      value: "Kyle killed it"
    }]
  }, {
    id: 2,
    question: "What's going well? Any wins ( big or little) this week?",
    answers: []
  }, {
    id: 3,
    question: "What challenges are you facing? Where are you stuck?",
    answers: []
  }, {
    id: 4,
    question: "How are you feeling? What's the morale you see around you?",
    answers: []
  }, {
    id: 5,
    question: "One suggestion to improve your role, team or organization?",
    answers: []
  }]
}, {
  id: 2,
  title: "Weekly Survey 12/5",
  completed: true,
  questions: [{
    id: 1,
    question: "Is there anyone this week you'd like to highlight for embodying our core values?",
    answers: []
  }, {
    id: 2,
    question: "What's going well? Any wins ( big or little) this week?",
    answers: []
  }]
}], obj => {
  return new Survey(obj);
});

export function SurveyFactory($q) {
  'ngInject';

  return {
    get: (id) => {
      return $q((resolve) => {
        resolve(_.find(data, (survey) => {
          return survey.id == id;
        }));
      });
    },
    getMostRecent: () => {
      return $q((resolve) => {
        resolve(data[0]);
      });
    },
    getList: () => {
      return $q((resolve) => {
        resolve(new SurveyList(data));
      });
    }
  };
}