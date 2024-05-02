// server.js
import http from 'http';
import { Server } from 'socket.io';

const httpServer = http.createServer((req, res) => {
   res.writeHead(404);
   res.end();
});

const io = new Server(httpServer, {
 // options
   cors: {
      origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5176", "http://localhost:5175"], // Adjust this to match the origin of your client
      methods: ["GET", "POST"], // Specify the methods allowed
      credentials: true // If you need to support credentials
   }
});

io.on('connection', (socket) => {
   console.log('Client connected');

   // server listen sendClick event and broadcast position
   socket.on('sendPosition', (position) => {
      console.log('received: ', position)
      socket.broadcast.emit('sendPosition', position)
   })

   socket.on('disconnect', () => {
      console.log('Client disconnected');
   });
});

httpServer.listen(8080, () => {
   console.log('WebSocket server running on ws://localhost:8080');
});
