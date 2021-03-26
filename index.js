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
var firstInRoom = {};
var isHost;

app.use(express.static(frontent));

io.on('connection', (socket) => {
  socket.on('win', (username, room) => {
    for(var i = 0; i < players.length; i++) {
      if(players[i].room = room) {
				players.splice(i, 1)
      }
		}
    io.to(room).emit('win', username);
  });
  socket.on('join', (usr, rm) => {
		/*
			firstInRoom = {
				(roomnumber) "123456": {
					firstPlayer: 0/1
				}
			}
		*/
		if(eval("firstInRoom." + rm + ".firstPlayer") == 0) {
			eval("firstInRoom." + rm + ".firstPlayer") = 1
			isHost = true;
		} else {
			isHost = false;
		}
		console.log(usr, rm);
    players += {
      username: usr,
      room: rm,
    }
		io.to(rm).emit('playerData', isHost);
  });
});

http.listen(PORT, () => {
  console.log("listening on " + HOST + ":" + PORT);
});
""