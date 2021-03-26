const PORT = process.env.PORT || 3000
const HOST =  process.env.HOST || "localhost";
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

function fancyDict(dict) {
	return "Player: " + dict.username + ", Room: " + dict.room;
}

const frontent = path.join(__dirname, 'frontend');

var players = [];
var dataArray = [];

app.use(express.static(frontent));

io.on('connection', (socket) => {
	dataArray = [];
	for(var i = 0; i < players.length; i++) {
		dataArray.push(fancyDict(players[i]));
	}
  socket.on('win', (username, room) => {
    for(var i = 0; i < players.length; i++) {
      if(players[i].room = room) {
				players.splice(i, 1)
      }
		}
    io.to(room).emit('win', username);
  });
  socket.on('join', (usr, rm, _isOwner) => {
		console.log(usr, rm, _isOwner);
    players += {
      username: usr,
      room: rm,
			isOwner: _isOwner
    }
  });
});

http.listen(PORT, () => {
  console.log("listening on " + HOST + ":" + PORT);
});
""