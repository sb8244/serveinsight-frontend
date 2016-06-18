export function CustomScrollbarDirective() {
  'ngInject';

  return {
    restrict: 'A',
    link: function(scope, el) {
      el.perfectScrollbar({
        suppressScrollX: true
      });

      // This causes massive digest cycles and may not be needed
      // $interval(function() {
      //   if(el[0].scrollHeight >= el[0].clientHeight) {
      //     el.perfectScrollbar("update");
      //   }
      // }, 60);
    }
  };
}
