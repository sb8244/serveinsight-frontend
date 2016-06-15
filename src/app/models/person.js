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

export function PersonFactory(Restangular, $q) {
  'ngInject';

  return {
    getList: function() {
      if (this.savedList) {
        return $q((resolve) => {
          resolve(this.savedList);
        });
      } else {
        return Restangular.all("mention_names").getList().then((data) => {
          let mapped = _.map(data.plain(), person => new Person(person));
          this.savedList = new PersonList(mapped);
          return this.savedList;
        });
      }
    }
  };
}
