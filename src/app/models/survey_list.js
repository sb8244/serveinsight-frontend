class SurveyList {
  constructor(surveys) {
    this.surveys = surveys;
  }
}

const data = [{
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
  completed: true
}];

export function SurveyListFactory($q) {
  'ngInject';

  return {
    getList: () => {
      return $q((resolve) => {
        resolve(new SurveyList(data));
      });
    }
  };
}