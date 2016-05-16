export default function ngInject(...injectable) {
  return function(target) {
    var factory = function(...args) {
      var container = Object.create( target.prototype || Object.prototype );
      var deps = _.zipObject(injectable, args);
      _.assign(container, this);
      _.assign(container, deps);
      var instantiated = ( target.call( container, ...args ) || container );
      return instantiated;
    };

    factory.$inject = injectable;

    return factory;
  };
}
