import { action, observable, makeAutoObservable, toJS } from 'mobx';
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
  @persist('list') @observable selectedFlight?: any | null = [];
  @persist('list') @observable flightType?: any | null = '';
  @persist('object') @observable bookFlight?: any | null = {};
  @persist('object') @observable baggage?: any | null = {};
  @persist('list') @observable extra_baggage?: any | null = [];
  @persist('object') @observable price_details?: any | null = {
    count: 0,
    base: 0,
    currency: '',
    totaltax: '',
    total: '',
  };
  @persist('list') @observable bookingData?: any | null = [];
  @action setbookingData = (req: any) => {
    this.bookingData = req;
  };
  @action setextra_baggage = (req: any) => {
    this.extra_baggage = req;
  };
  @action setprice_details = (req: any) => {
    this.price_details = req;
  };
  @action setbaggage = (req: any) => {
    this.baggage = req;
  };
  @action setbookFlight = (req: any) => {
    this.bookFlight = req;
  };
  @action setFlightType = (req: any) => {
    this.flightType = req;
  };
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
  @action setsearchKeys = (req: any) => {
    this.searchKeys = req;
  };
  @action setselectedFlight = (req: any) => {
    this.selectedFlight = req;
  };

  constructor() {
    makeAutoObservable(this);
  }
}
export default new flightDetails();
