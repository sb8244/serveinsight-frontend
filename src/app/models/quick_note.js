class QuickNoteList {
  constructor(notes) {
    this.notes = notes;
  }
}

class QuickNote {
  constructor(data) {
    _.extend(this, data);
  }
}

const data = _.map([{
    id: 1,
    content: "This is a test"
  }, {
    id: 2,
    content: "A longer note about something that happened during the week"
  }
], (data) => {
  return new QuickNote(data);
});

export function QuickNoteFactory($q) {
  'ngInject';

  return {
    getList: function() {
      return $q((resolve) => {
        resolve(new QuickNoteList(data));
      });
    }
  };
}