import { action, observable, computed } from "mobx";

class FlightStore {
  @observable airLineList: any | null = null;

  @action
  SetAirLineList = (airLineList: any | null) => {
    console.log("airLineList:", airLineList);
    this.airLineList = airLineList;
  };

  @computed
  get getAirLineList() {
    return this.airLineList;
  }
}
export default new FlightStore();
