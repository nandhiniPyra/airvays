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
      .catch((error) => {
        console.log('inside error');
        console.log('error', JSON.stringify(error));
      });
  } catch (e) {
    callback(e.response.data, null);
  }
};
export const _searchFlights = (payload: any, callback: any) => {
  try {
    let request = {
      reqmethod: 'POST',
      url: 'searchFlights',
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
  } catch (e) {
    callback(e.response.data, null);
  }
};
