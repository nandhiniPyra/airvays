import Axios from 'axios';
const BASE_URL = 'http://188.166.228.50:8001/web/v1/';

interface request {
  reqmethod: any;
  url: string;
  param?: any | null | undefined;
  reqdata?: any | null | undefined;
}
export const common = async ({ reqmethod, url, param, reqdata }: request) => {
  return Axios({
    method: reqmethod,
    url: BASE_URL + url,
    data: reqdata,
    params: param,
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('accesstoken')}`,
    },
  });
};
export const multimedia = async ({
  reqmethod,
  url,
  param,
  reqdata,
}: request) => {
  return Axios({
    method: reqmethod,
    url: BASE_URL + url,
    data: reqdata,
    params: param,
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
      Authorization: `${localStorage.getItem('accesstoken')}`,
    },
  });
};
