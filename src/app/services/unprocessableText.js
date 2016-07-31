export function unprocessableEntityText($filter) {
  'ngInject';

  var humanizeConstant = $filter("humanizeConstant");

  return function(err) {
    var resp = [];
    _.each(err.data.errors, function(texts, type) {
      resp.push(humanizeConstant(type) + " " + texts.join(" "));
    });
    return resp;
  };
}
