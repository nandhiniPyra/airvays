// myprofile

import { common, multimedia } from './utils/core';

export const _getUserProfile = (payload: any, callback: any) => {
  try {
    let request = {
      reqmethod: 'POST',
      url: 'getUserProfile',
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

export const _updateUserProfile = (payload: any, callback: any) => {
  try {
    let request = {
      reqmethod: 'POST',
      url: 'updateProfile',
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

export const _userImageUpload = (payload: any, callback: any) => {
  try {
    let request = {
      reqmethod: 'POST',
      url: 'updateImage',
      param: {},
      reqdata: payload,
    };
    multimedia(request)
      .then((response: any) => {
        response.status === 200 && callback(null, response.data);
      })
      .catch((error) => {
        console.log('error', JSON.stringify(error));
      });
  } catch (e: any) {
    callback(e.response.data, null);
  }
};
