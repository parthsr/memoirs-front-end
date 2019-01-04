import socketIOClient from 'socket.io-client';

const client = socketIOClient('https://memoirs-back.herokuapp.com/chat');

export default client;

export const emit = (event, message) => client.emit(event, message); 

export const on = (event, callback) => client.on(event, callback);