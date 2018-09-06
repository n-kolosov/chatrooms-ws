'use strict';

const webSocket = require('ws');

const server = new webSocket.Server({ port: 3000 });

server.on('connection', ws => {
  ws.on('message', message => {
    if (message === '/exit') {
      ws.close();
    } else {
      server.clients.forEach(client => {
        if (client.readyState === webSocket.OPEN) {
          client.send(message);
        }
      });
    }
  });
  ws.send('Welcome');
});
