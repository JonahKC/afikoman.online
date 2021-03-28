const PORT = process.env.PORT || 3000
const HOST =  process.env.HOST || "localhost";
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const frontent = path.join(__dirname, 'frontend');

var firstInRoom = {};
var isHost;

function deleteByKey(dictionary, key) {
   if(key in dictionary === true) {
      delete dictionary[key];
      return true;
   }
   return false;
}

app.use(express.static(frontent));

io.on('connection', (socket, room) => {
	socket.on('leaveroom', function(username, room) {
		console.log(`${username} is attempting to leave room ${room}`)
		deleteByKey(firstInRoom, room);
		socket.leave(io.sockets.adapter.sids[socket.id]);
	});
	socket.on('showgame', (rm) => {
		io.to(rm).emit('showgame');
	})
	socket.on('hostbk', (bk, rm) => {
		console.log("BACKGROUND: " + bk);
		console.log("ROOM (SERVER): " + rm)
		io.to(rm).emit('hostbkreceive', bk);
	});
  socket.on('win', (username, room) => {
    io.to(room).emit('wingame', username);
  });
  socket.on('join', (usr, rm) => {
		if(rm in firstInRoom === false) {
			firstInRoom[rm] += {firstPlayer: 1}
			isHost = true
		} else {
			isHost = false
		}
		console.log(isHost);
		console.log(usr);
		console.log("ROOM: " + rm);
		socket.join(rm);
		io.to(rm).emit('playerData', isHost, socket.id);
  });
});

http.listen(PORT, () => {
  console.log("listening on " + HOST + ":" + PORT);
});
""