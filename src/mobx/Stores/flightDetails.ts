import { action, observable, makeObservable, toJS } from 'mobx';
import { persist } from 'mobx-persist';

let initialstate = {
  from: '',
  to: '',
  currencyCode: 'INR',
  type: 'one-way',
  from_date: null,
  to_date: null,
  no_of_people: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  class: 'ECONOMY',
  fromcity: '',
  tocity: '',
};
class flightDetails {
  @persist('list') @observable flightlist?: any | null = [{}];
  @persist('object') @observable searchRequest = initialstate;
  @persist('object') @observable searchKeys = { fromCity: '', toCity: '' };
  @action setsearchRequest = (req: any) => {
    this.searchRequest = req;
  };
  @action setflightlist = (req: any) => {
    this.flightlist = req;
  };
  @action getflightbyid = (id: string) => {
    if (this.flightlist && this.flightlist.length > 0) {
      const result = toJS(this.flightlist.find((x: any) => x.id === id));
      return result;
    } else return {};
  };
  @action setsearchKeys = (req: any) => {};
  @action setselectedFlight = (req: any) => {};

  constructor() {
    makeObservable(this);
  }
}
export default new flightDetails();
