export function CommentFactory(Restangular) {
  'ngInject';

  return {
    create: function({ comment, comment_grant }) {
      let data = { comment, comment_grant };

      return Restangular.all("comments").post(data).then((comment) => {
        return comment.plain();
      });
    }
  }
}
