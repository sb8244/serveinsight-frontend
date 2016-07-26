export function confirmationNeeded() {
  'ngInject';

  return {
    restrict: "A",
    link: function (scope, element, attr) {
      var msg = attr.confirmationNeeded || "Are you sure?";
      var clickAction = attr.confirmClick;

      element.bind('click', function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();

        if (window.confirm(msg)) {
          scope.$eval(clickAction);
        }
      });
    }
  };
};
