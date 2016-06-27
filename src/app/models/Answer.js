class Answer {
  constructor(data) {
    _.assign(this, data);
  }
}

export function AnswerFactory(Restangular) {
  'ngInject';

  return {
    find: function(id) {
      return Restangular.one("answers", id).get().then((data) => {
        return new Answer(data.plain());
      });
    }
  }
}
