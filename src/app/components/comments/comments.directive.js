export function CommentsDirective() {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'app/components/comments/comments.html',
    scope: {
      commentable: '=',
      showNew: '=',
      skipAutofocus: '=?'
    },
    controller: CommentsController,
    controllerAs: 'ctrl',
    bindToController: true
  }
}

class CommentsController {
  constructor(Person, OrganizationMember, Comment) {
    'ngInject';

    this.Comment = Comment;
    OrganizationMember.get().then(member => this.member = member);
    Person.getList().then(personList => this.people = personList.people);
  }

  addComment() {
    this.Comment.create({
      comment: this.newContent,
      comment_grant: this.commentable.comment_grant
    }).then((comment) => {
      this.commentable.comments.push(comment);
      delete this.newContent;
      this.showNew = false;
    });
  }
}
