import { create } from 'mobx-persist';

import languageStore from './languageStore';
import userStore from './userStore';
import flightDetails from './flightDetails';

const hydrate = create({
  jsonify: true,
  storage: localStorage,
});
class RootStore {
  languageStore = languageStore;
  userStore = userStore;
  flightDetails = flightDetails;
  constructor() {
    Promise.all([
      hydrate('lan', this.languageStore),
      hydrate('user', this.userStore),
      hydrate('flightDetails', this.flightDetails),
    ]);
  }
}

export default new RootStore();
