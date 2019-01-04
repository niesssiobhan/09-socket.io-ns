'use strict';

const io = require('socket.io-client');

const numbers = io.connect('http://localhost:3000/numbers');
const letters = io.connect('http://localhost:3000/letters');

letters.on('letter', (payload) => {
  console.log({payload});
});


numbers.on('number', (num) => {
  console.log({num});
})