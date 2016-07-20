class ShoutoutList {
  constructor(shoutouts) {
    this.shoutouts = shoutouts;
  }

  count({ max=Infinity }) {
    return Math.min(this.shoutouts.length, max);
  }
}

class Shoutout {
  constructor(data) {
    _.extend(this, data);
  }
}

export function ShoutoutFactory(Restangular) {
  'ngInject';

  return {
    createShoutout: function(content) {
      return Restangular.all("shoutouts").post({ content });
    },
    getList: function({ page=1 }) {
      return Restangular.all("shoutouts").getList({ page }).then((resp) => {
        let shoutouts = _.map(resp.plain(), (data) => new Shoutout(data));
        return new ShoutoutList(shoutouts);
      });
    }
  };
}
