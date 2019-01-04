'use strict';

const io = require('socket.io')(3000);

const numbers = io.of('/numbers');
const letters = io.of('/letters');

 let counter = 0;
 let n = 1;
 let letter = 'A';

numbers.on('connection', (socket) => {
  console.log('connected to numbers', socket.id);

  socket.on('join', (room, cb) => {
    socket.join(room);
    cb && cb(`joined ${room}`);
  });

  socket.on('next-number', () => {
    socket.broadcast.emit('number', counter);
    
    socket.in('negative').broadcast.emit('_number', -counter);
    counter++;
  });

})

letters.on('connection', (socket) => {
  console.log('connection to letters', socket.id);

  socket.on('join', (room, cb) => {
    socket.join(room);
    cb && cb(`joined ${room}`);
  });

  socket.on('next-letter', () => {
    socket.broadcast.emit('letter', letter);
    
    socket.in('lowercase').broadcast.emit('_letter', letter.toLowerCase());
    if(n > 25){
      n = 0;
    }
    letter = String.fromCharCode(65 + n);
    n++;
  });

})