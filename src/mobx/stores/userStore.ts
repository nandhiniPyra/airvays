import { User } from 'firebase';
import { action, observable, computed } from 'mobx';

class UserStore {
  @observable user: User | null = null;
  @observable socket: any | null = null;

  @action
  changeUser = (user: User | null) => {
    this.user = user;
  };
  @action
  setSocket = (socket: String) => {
    this.socket = socket;
  };

  @computed
  get getSocket() {
    return this.socket;
  }
}
export default new UserStore();
