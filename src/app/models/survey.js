class SurveyList {
  constructor(surveys) {
    this.surveys = surveys;
  }

  dueCount() {
    return _(this.surveys).select({ completed: false }).size();
  }
}

class Question {
  constructor(data, locked) {
    _.extend(this, data);
    this.surveyLocked = locked;
  }

  questionNeedsBlankAnswer() {
    if (this.surveyLocked) {
      return false;
    }

    return this.answers.length === 0 || _.all(this.answers, function(answer) {
      return answer.content;
    });
  }

  cleanupAnswer(answer) {
    if (!answer.content) {
      var lastAnswer = _.last(this.answers);

      if (!lastAnswer.content) {
        _.remove(this.answers, lastAnswer);
      }
    }

    this.addBlankAnswer();
  }

  addBlankAnswer() {
    if (this.questionNeedsBlankAnswer()) {
      this.answers.push({
        content: ""
      });
    }
  }
}

class Survey {
  constructor(data) {
    _.extend(this, data);
    this.questions = _.map(this.questions, question => new Question(question, this.locked));
  }
}

const data = _.map([{
  id: 1,
  title: "Weekly Survey 12/15",
  completed: false,
  locked: false,
  previousGoals: [{
    id: 1,
    user_id: 1,
    content: "Migrate database to MongoDB",
    complete: true
  }, {
    id: 2,
    user_id: 1,
    content: "Code everything in ASP",
    complete: false
  }],
  questions: [{
    id: 1,
    user_id: 1,
    question: "Is there anyone this week you'd like to highlight for embodying our core values?",
    answers: [{
      content: "Kyle killed it",
      comments: []
    }]
  }, {
    id: 2,
    user_id: 1,
    question: "What's going well? Any wins ( big or little) this week?",
    answers: []
  }, {
    id: 3,
    user_id: 1,
    question: "What challenges are you facing? Where are you stuck?",
    answers: []
  }, {
    id: 4,
    user_id: 1,
    question: "How are you feeling? What's the morale you see around you?",
    answers: []
  }, {
    id: 5,
    user_id: 1,
    question: "One suggestion to improve your role, team or organization?",
    answers: []
  }, {
    id: 6,
    user_id: 1,
    question: "What do you intend to achieve between now and your next survey?",
    answers: [],
    goals_section: true
  }]
}, {
  id: 2,
  title: "Weekly Survey 12/5",
  completed: true,
  locked: true,
  questions: [{
    id: 1,
    user_id: 1,
    question: "Is there anyone this week you'd like to highlight for embodying our core values?",
    answers: [{
      content: "Kyle killed it",
      comments: [
        {
          id: 1,
          content: "@kyle is definitely going for it this week!",
          author_id: 1,
          author_name: "Steve Bussey"
        },
        {
          id: 2,
          content: "Thanks guys",
          author_id: 1,
          author_name: "Kyle Johnson"
        }
      ]
    }]
  }, {
    id: 2,
    user_id: 1,
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