require('dotenv').config();
const API_URL = 'https://api.cineintro.com/dev';
const CHAT_API_URL = 'https://api.cineintro.com/chatdev';
console.log('API_URL', API_URL);

export const get = async (endpoint: string) => {
  const res = await fetch(`${API_URL}${endpoint}`);
  const json = await res.json();
  return json;
};

export const post = async (
  endpoint: string,
  bodyObj: any = {},
  header: any = {}
) => {
  const accessTokenObj =
    localStorage.getItem('accesstoken') ||
    'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMDk1MWY5MjE4YjYwMTA0YmFiZDVlYyIsImlhdCI6MTYxODI5ODQxNn0.5KjXSnhsQJk9Tw2XiVZYCiVkrDUq29uJ0fCfftW8eM4';
  const mainHeader = { Authorization: accessTokenObj };

  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...mainHeader,
      ...header
    },
    // body: urlEncodedBody.toString(),
    body: JSON.stringify(bodyObj),
    redirect: 'follow'
  });
  const json = await res.json();
  return json;
};

export const SocketPost = async (
  endpoint: string,
  bodyObj: any = {},
  header: any = {}
) => {
  const accessTokenObj = localStorage.getItem('accesstoken') || null;
  const mainHeader = { Authorization: accessTokenObj };

  const res = await fetch(`${CHAT_API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...mainHeader,
      ...header
    },
    // body: urlEncodedBody.toString(),
    body: JSON.stringify(bodyObj),
    redirect: 'follow'
  });
  const json = await res.json();
  return json;
};
