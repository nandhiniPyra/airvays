import { common } from './utils/core';
export const _getAirports = (payload: any, callback: any) => {
  try {
    let request = {
      reqmethod: 'POST',
      url: 'getAirports',
      param: {},
      reqdata: payload,
    };
    common(request)
      .then((response: any) => {
        response.status === 200 && callback(null, response.data);
        // return response;
      })
      .catch((error: any) => {
        console.log('inside error');
        console.log('error', JSON.stringify(error));
      });
  } catch (e: any) {
    callback(e.response.data, null);
  }
};
export const _hotelCitySearchByKeyword = (payload: any, callback: any) => {
  try {
    let request = {
      reqmethod: 'POST',
      url: 'hotelCitySearchByKeyword',
      param: {},
      reqdata: payload,
    };
    common(request)
      .then((response: any) => {
        response.status === 200 && callback(null, response.data); // return response;
      })
      .catch((error: any) => {
        callback(error, null);
        console.log('inside error');
        console.log('error', JSON.stringify(error));
      });
  } catch (e: any) {
    callback(e.response, null);
  }
};
