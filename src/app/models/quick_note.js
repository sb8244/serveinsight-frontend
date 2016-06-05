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
    content: "The planning meeting went really well this week. Product did a good job preparing."
  }, {
    id: 2,
    content: "The major feature release could have gone better."
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
