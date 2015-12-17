class PersonList {
  constructor(people) {
    this.people = people;
  }
}

class Person {
  constructor(data) {
    _.extend(this, data);
    this.label = this.name;
  }
}

const data = _.map([{
    id: 1,
    name: "Steve",
    department: "Engineering"
  }, {
    id: 2,
    name: "Rob",
    department: "Engineering"
  }
], (data) => {
  return new Person(data);
});

export function PersonFactory($q) {
  'ngInject';

  return {
    getList: function() {
      return $q((resolve) => {
        resolve(new PersonList(data));
      });
    }
  };
}