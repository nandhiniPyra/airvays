import { create } from 'mobx-persist';

import languageStore from './languageStore';
import userStore from './userStore';
import FlightStore from './flightStore';
import flightDetails from './flightDetails';
const hydrate = create({
  jsonify: true,
});
class RootStore {
  languageStore = languageStore;
  userStore = userStore;
  FlightStore = FlightStore;
  flightDetails = flightDetails;

  constructor() {
    Promise.all([
      hydrate('lan', this.languageStore),
      hydrate('user', this.userStore),
      hydrate('FlightStore', this.FlightStore),
      hydrate('flightDetails', this.flightDetails),
    ]);
  }
}

export default new RootStore();
