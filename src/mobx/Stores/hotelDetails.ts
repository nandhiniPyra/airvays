import { action, observable, makeObservable } from 'mobx';
import { persist } from 'mobx-persist';
import { serializable } from 'serializr';
import { create } from 'mobx-persist';

const hydrate = create({
  jsonify: true,
  storage: localStorage,
});
let initialvalue_hotel = {
  adults: 1,
  checkInDate: null,
  checkOutDate: null,
  priceRange: '',
  ratings: '',
  boardType: '',
  cityCode: '',
};

class hotelDetails {
  @serializable @persist('object') @observable hotelsearchRequest =
    initialvalue_hotel;
  @serializable @persist('object') @observable viewHotel = initialvalue_hotel;
  @serializable @persist('object') @observable searchKeys = {
    fromCity: '',
    toCity: '',
  };

  @action sethotelsearchRequest = (req: any) => {
    this.hotelsearchRequest = req;
  };
  @action setviewHotel = (req: any) => {
    this.viewHotel = req;
  };

  constructor() {
    makeObservable(this);
  }
}
export const HotelDetails = new hotelDetails();
hydrate('hotelDetails', HotelDetails).then(() =>
  console.log('hotelDetails has been hydrated'),
);
