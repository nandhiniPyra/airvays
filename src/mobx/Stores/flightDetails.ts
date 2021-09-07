import { action, observable, toJS, makeObservable } from 'mobx';
import { persist } from 'mobx-persist';
import { serializable } from 'serializr';
import { create } from 'mobx-persist';

const hydrate = create({
  jsonify: true,
  storage: localStorage,
});

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
  @serializable @persist('list') @observable flightlist?: any | null = [{}];
  @serializable @persist('object') @observable searchRequest?: any | null =
    initialstate;
  @serializable @persist('object') @observable searchKeys?: any | null = {
    fromCity: '',
    toCity: '',
  };
  @serializable @persist('list') @observable selectedFlight?: any | null = [];
  @serializable @persist('list') @observable flightType?: any | null = '';
  @serializable @persist('object') @observable bookFlight?: any | null = {};
  @serializable @persist('object') @observable baggage?: any | null = {};
  @serializable @persist('list') @observable extra_baggage?: any | null = [];
  @serializable @persist('object') @observable price_details?: any | null = {
    count: 0,
    base: 0,
    currency: '',
    totaltax: '',
    total: '',
  };
  @persist('list') @observable bookingData?: any | null = [];
  @persist('list') @observable FlightDeatilsData?: any | null = [];
  @action setflightDeatilsData= (req: any) => {
    this.FlightDeatilsData = req;
  };
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
    makeObservable(this);
  }
}
export const FlightDetails = new flightDetails();
hydrate('flightDetails', FlightDetails).then(() =>
  console.log('flightDetails has been hydrated'),
);
