import { action, computed, observable } from 'mobx';

class ActivityStore {
  @observable chatCount: boolean = false;

  @action
  setChatCount = (chatCount: boolean) => {
    this.chatCount = chatCount;
  };

  @computed
  get isChatCountExist() {
    return this.chatCount;
  }
}
export default new ActivityStore();
