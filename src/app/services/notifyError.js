export function notifyError(notify) {
  'ngInject';

  return function(err) {
    notify({
      message: err.data.errors.join(" - "),
      classes: "error"
    });
  }
}
