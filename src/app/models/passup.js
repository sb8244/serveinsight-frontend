import { goalSurveyQuestion } from './survey';

class PassupList {
  constructor(passups, Restangular) {
    this.passups = passups;
    this.Restangular = Restangular;
  }

  count() {
    return this.passups.length;
  }

  complete(passup) {
    return this.Restangular.one("passups", passup.id).customPOST({}, "complete").then(() => {
      _.remove(this.passups, { id: passup.id });
      return this;
    });
  }
}

class Passup {
  constructor(data) {
    _.extend(this, data);

    if (data.passupable_type === "Goal") {
      data.passupable.question_type = "string";
      data.passupable.question_content = goalSurveyQuestion;
    }
  }
}

export function PassupFactory(Restangular) {
  'ngInject';

  return {
    getList: function() {
      return Restangular.all("passups").getList().then((data) => {
        let passups = _.map(data.plain(), (passup) => new Passup(passup, Restangular));
        return new PassupList(passups, Restangular);
      })
    },
    createPassup: function(passup_grant) {
      return Restangular.all("passups").post({ passup_grant }).then((resp) => {
        return resp.plain();
      });
    }
  };
}
