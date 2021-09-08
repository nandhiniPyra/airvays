import { common } from './utils/core';

export const _hotelOffersSearch = (payload: any, callback: any) => {
  try {
    let request = {
      reqmethod: 'POST',
      url: 'hotelOffersSearch',
      param: {},
      reqdata: payload,
    };
    common(request)
      .then((response: any) => {
        response.status === 200 && callback(null, response.data);
      })
      .catch((error) => {
        console.log('inside error');
        console.log('error', JSON.stringify(error));
      });
  } catch (e: any) {
    callback(e.response.data, null);
  }
};

export const _viewHotelRooms = (payload: any, callback: any) => {
  try {
    let request = {
      reqmethod: 'POST',
      url: 'viewHotelRooms',
      param: {},
      reqdata: payload,
    };
    common(request)
      .then((response: any) => {
        response.status === 200 && callback(null, response.data);
        // return response;
      })
      .catch((error) => {
        console.log('inside error');
        console.log('error', JSON.stringify(error));
      });
  } catch (e: any) {
    callback(e.response.data, null);
  }
};
export const _viewHotelRoomDetails = (payload: any, callback: any) => {
  try {
    let request = {
      reqmethod: 'POST',
      url: 'viewHotelRoomDetails',
      param: {},
      reqdata: payload,
    };
    common(request)
      .then((response: any) => {
        response.status === 200 && callback(null, response.data);
        // return response;
      })
      .catch((error) => {
        console.log('inside error');
        console.log('error', JSON.stringify(error));
      });
  } catch (e: any) {
    callback(e.response.data, null);
  }
};
