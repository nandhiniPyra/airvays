import { User } from 'firebase';
import { action, observable } from 'mobx';
import { create } from 'mobx-persist';

const hydrate = create({
  jsonify: true,
  storage: localStorage,
});
class userStore {
  @observable user: User | null = null;

  @action
  changeUser = (user: User | null) => {
    this.user = user;
  };
}
export const UserStore = new userStore();
hydrate('UserStore', userStore).then(() =>
  console.log('UserStore has been hydrated'),
);
