export function CustomScrollbarDirective($interval) {
  'ngInject';

  return {
    restrict: 'A',
    link: function(scope, el) {
      el.perfectScrollbar({
        suppressScrollX: true
      });

      $interval(function() {
        if(el[0].scrollHeight >= el[0].clientHeight)
          el.perfectScrollbar("update");
      }, 60);
    }
  };
}
