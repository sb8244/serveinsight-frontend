export function dateTimePickerWatch(binding, scope, name) {
  scope.$watch(name, function(newValue, oldValue) {
    if (newValue == null) {
      var date = oldValue;
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      binding.due_at_picker.date = date;
      binding.survey.setFirstDueAt(date);
    }
  });
}
