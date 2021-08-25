import { action, computed, observable, makeObservable, toJS } from 'mobx';

class flightDetails {
  flightlist?: any | null = [{}];
  searchRequest = {};
  setsearchRequest = (req: any) => {
    this.searchRequest = req;
  };
  setflightlist = (req: any) => {
    this.flightlist = req;
  };
  getflightbyid = (id: string) => {
    if (this.flightlist && this.flightlist.length > 0) {
      const result = toJS(this.flightlist.find((x: any) => x.id === id));
      console.log(result, '*&*&*&*&*&');
      return result;
    } else return {};
  };
  constructor() {
    makeObservable(this, {
      searchRequest: observable,
      flightlist: observable,
      setsearchRequest: action,
      setflightlist: action,
      getflightbyid: action,
    });
  }
}
export default new flightDetails();
