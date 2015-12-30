import ngInject from '../decorators/ng_inject';

@ngInject("passupList")
export class ListController {
  constructor(passupList) {
    this.readPassups = passupList.readPassups();
    this.unreadPassups = passupList.unreadPassups();
  }

  markRead(passup) {
    passup.read = true;
    this.readPassups = this.passupList.readPassups();
    this.unreadPassups = this.passupList.unreadPassups();
  }
}
