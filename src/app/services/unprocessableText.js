export function unprocessableEntityText() {
  'ngInject';

  return function(err) {
    var resp = "";
    _.each(err.data.errors, function(texts, type) {
      if (resp !== "") {
        resp += ", ";
      }

      type = type[0].toUpperCase() + type.slice(1);

      resp += type + " " + texts.join(" ");
    });
    return resp;
  };
}
