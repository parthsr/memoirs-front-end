import socketIOClient from 'socket.io-client';

const client = socketIOClient('http://0.0.0.0:8080/chat');

export default client;

export const emit = (event, message) => client.emit(event, message); 

export const on = (event, callback) => client.on(event, callback);