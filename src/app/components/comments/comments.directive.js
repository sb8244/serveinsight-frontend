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
  constructor(Person, OrganizationMember) {
    'ngInject';

    OrganizationMember.get().then(member => this.member = member);
    Person.getList().then(personList => this.people = personList.people);
  }

  addComment() {
    this.commentable.comments.push({
      id: null,
      content: this.newContent,
      author_id: this.member.id,
      author_name: this.member.name
    });

    delete this.newContent;
    this.showNew = false;
  }
}
