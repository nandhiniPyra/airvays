import { common } from './utils/core';

export const _forgotPasswordSendOtp = (payload: any, callback: any) => {
  try {
    let request = {
      reqmethod: 'POST',
      url: 'forgotPasswordSendOtp',
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
export const _forgorPasswordVerifyOtp = (payload: any, callback: any) => {
  try {
    let request = {
      reqmethod: 'POST',
      url: 'forgorPasswordVerifyOtp',
      param: {},
      reqdata: payload,
    };
    common(request)
      .then((response: any) => {
        response.status == 200 && callback(null, response.data);
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

export const _signup = (payload: any, callback: any) => {
  try {
    let request = {
      reqmethod: 'POST',
      url: 'signup',
      param: {},
      reqdata: payload,
    };
    common(request)
      .then((response: any) => {
        response.status == 200 && callback(null, response.data);
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
