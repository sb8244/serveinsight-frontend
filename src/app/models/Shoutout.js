const PAGE_LIMIT = 10;

class Shoutout {
  constructor(data) {
    _.extend(this, data);
  }
}

class ShoutoutList {
  constructor(shoutouts, { page=1, Restangular }) {
    this.shoutouts = shoutouts;
    this.page = page;
    this.Restangular = Restangular;
    this.limitedTo = null;
  }

  empty() {
    return this.count() === 0;
  }

  count() {
    return this.shoutouts.length;
  }

  canLoadMore() {
    if (this.limitedTo) {
      return this.shoutouts.length > this.limitedTo;
    }

    return this.page * PAGE_LIMIT === this.count();
  }

  loadMore() {
    if (this.limitedTo) {
      this.limitedTo = null;
      return;
    }

    this.loading = true;
    this.Restangular.all("shoutouts").getList({ page: this.page + 1 }).then((resp) => {
      this.page++;
      let shoutouts = _.map(resp.plain(), (data) => new Shoutout(data));
      this.shoutouts = this.shoutouts.concat(shoutouts);
    }).finally(() => this.loading = false);
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
        return new ShoutoutList(shoutouts, { page, Restangular });
      });
    },
    get: function(id) {
      return Restangular.one("shoutouts", id).get().then((resp) => {
        return new Shoutout(resp.plain());
      });
    }
  };
}
