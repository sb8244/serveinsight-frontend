export default function ngInject(...injectable) {
  return function(target) {
    var factory = function(...args) {
      var instantiated = new target(...args);
      var deps = _.zipObject(injectable, args);
      _.assign(instantiated, deps);
      return instantiated;
    };

    factory.$inject = injectable;

    return factory;
  };
}
