import { common } from './utils/core';

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
  } catch (e: any) {
    callback(e.response.data, null);
  }
};
export const _trackPrice = (payload: any, callback: any) => {
  try {
    let request = {
      reqmethod: 'POST',
      url: 'trackPrice',
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

export const _priceAnalysis = (payload: any, callback: any) => {
  try {
    let request = {
      reqmethod: 'POST',
      url: 'priceAnalysis',
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

export const _flightDetails = (payload: any, callback: any) => {
  try {
    let request = {
      reqmethod: 'POST',
      url: 'getFlightDeatils',
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

export const _addBaggage = (payload: any, callback: any) => {
  try {
    let request = {
      reqmethod: 'POST',
      url: 'addBaggage',
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
export const _bookFlight = (payload: any, callback: any) => {
  try {
    let request = {
      reqmethod: 'POST',
      url: 'bookFlight',
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
