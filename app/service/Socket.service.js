import socketIOClient from 'socket.io-client';

const client = socketIOClient('http://localhost:8080/game');

export default client;

export const emit = (event, message) => client.emit(event, message); 

export const on = (event, callback) => client.on(event, callback);