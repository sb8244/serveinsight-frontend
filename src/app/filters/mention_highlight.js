export function MentionHighlight($sce, $sanitize) {
  'ngInject';

  return function highlight(haystack) {
    var clean = $sanitize(haystack);

    return $sce.trustAsHtml(clean.replace(/@[^\W]*/gi), function(match) {
        return '<span class="mention-highlight">' + match + '</span>';
    }));
  };
}
