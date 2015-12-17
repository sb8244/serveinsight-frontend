export function CommentsDirective() {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'app/components/comments/comments.html',
    scope: {
      commentable: '=',
      showNew: '='
    },
    controller: CommentsController,
    controllerAs: 'ctrl',
    bindToController: true
  }
}

class CommentsController {
  constructor(Person, User) {
    'ngInject';

    User.get().then(user => this.user = user);
    Person.getList().then(personList => this.people = personList.people);
  }

  addComment() {
    this.commentable.comments.push({
      id: null,
      content: this.newContent,
      author_id: this.user.id,
      author_name: this.user.name
    });

    delete this.newContent;
    this.showNew = false;
  }
}