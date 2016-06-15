class PersonList {
  constructor(people) {
    this.people = people;
  }
}

class Person {
  constructor(data) {
    _.extend(this, data);
    this.label = this.mention_name;
  }
}

export function PersonFactory(Restangular) {
  'ngInject';

  return {
    getList: function() {
      return Restangular.all("mention_names").getList().then((data) => {
        let mapped = _.map(data.plain(), person => new Person(person));
        return new PersonList(mapped);
      });
    }
  };
}
