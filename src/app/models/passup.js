import { goalSurveyQuestion } from './survey';

class PassupList {
  constructor(passups) {
    this.passups = passups;
  }

  count() {
    return this.passups.length;
  }

  complete(passup) {
    return passup.complete().then(() => {
      _.remove(this.passups, { id: passup.id });
      return this;
    });
  }
}

class Passup {
  constructor(data, Restangular) {
    _.extend(this, data);
    this.Restangular = Restangular;

    if (data.passupable_type === "Goal") {
      data.passupable.question_type = "string";
      data.passupable.question_content = goalSurveyQuestion;
    }
  }

  complete() {
    return this.Restangular.one("passups", this.id).customPOST({}, "complete").then(() => {
      return this;
    });
  }
}

export function PassupFactory(Restangular) {
  'ngInject';

  return {
    getList: function() {
      return Restangular.all("passups").getList().then((data) => {
        let passups = _.map(data.plain(), (passup) => new Passup(passup, Restangular));
        return new PassupList(passups);
      });
    },
    find: function(id) {
      return Restangular.one("passups", id).get().then((data) => {
        return new Passup(data.plain(), Restangular);
      });
    },
    createPassup: function(passup_grant) {
      return Restangular.all("passups").post({ passup_grant }).then((resp) => {
        return resp.plain();
      });
    }
  };
}
