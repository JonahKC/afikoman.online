const PORT = process.env.PORT || 3000
const HOST =  process.env.HOST || "localhost";
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const frontent = path.join(__dirname, 'frontend');

var players = [];

app.use(express.static(frontent));

function fancyDict(dict) {
	return `[Player: ${dict.username}, Room: ${dict.room}]`;
}

io.on('connection', (socket) => {
	console.log(`Someone has connected! There are currently ${players.length} people playing.`)
  socket.on('win', (username, room) => {
    for(var i = 0; i < players.length; i++) {
      if(players[i].room = room) {
				players.splice(i, 1)
      }
		}
    io.to(room).emit('win', username);
  });
  socket.on('join', (usr, rm, _isOwner) => {
    players += {
      username: usr,
      room: rm,
			isOwner: _isOwner
    }
    socket.join('room');
    io.to('room').emit('updateplayers', players, rm)
		console.log(players.toString())
  });
});

http.listen(PORT, () => {
  console.log("listening on " + HOST + ":" + PORT);
});
""