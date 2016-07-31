export function humanizeConstant() {
  'ngInject';

  return function(text) {
    if (text) {
      var string = text.split("_").join(" ").toLowerCase();
      string = string.charAt(0).toUpperCase() + string.slice(1);
      return string;
    }
  };
}
