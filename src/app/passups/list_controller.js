export class ListController {
  constructor(passupList) {
    'ngInject';

    this.passupList = passupList;
    this.readPassups = passupList.readPassups();
    this.unreadPassups = passupList.unreadPassups();
  }
}