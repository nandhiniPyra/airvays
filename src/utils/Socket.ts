import { io } from 'socket.io-client';
// const SOCKET_URL: string | undefined = 'http://localhost:3007/stackabuse'
// const SOCKET_URL: string | undefined = 'https://api.cineintro.com'
const SOCKET_URL: string | undefined = 'https://api.cineintro.com'
const SOCKET_PATH: string | undefined = '/chatdev/socket.io';
console.log('SOCKET_URL', SOCKET_URL);

export const socket = (token: string) => {
  return new Promise((resolve, reject) => {
    const socket = io(SOCKET_URL || '', {
      path: SOCKET_PATH,
      extraHeaders: { Authorization: `token ${token}` },
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: 10
    });
    socket.on('connect', () => {
      console.log('connected');
      resolve(socket);
    });

    socket.on('connect_error', (error: any) => {
      console.log('socket_error', error);
      reject(error);
    });
  });
};
