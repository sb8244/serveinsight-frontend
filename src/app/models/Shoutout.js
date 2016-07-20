export function ShoutoutFactory(Restangular) {
  'ngInject';

  return {
    createShoutout: function(content) {
      return Restangular.all("shoutouts").post({ content });
    }
  };
}
