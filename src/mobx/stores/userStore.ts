import { User } from 'firebase';
import { action, observable, computed } from 'mobx';

class UserStore {
  @observable user: User | null = null;

  @action
  changeUser = (user: User | null) => {
    this.user = user;
  };
}
export default new UserStore();
