const playerList = document.getElementById("list-body");
var player;
var socket = io();

socket.on('updateplayers', function(players, code) {
    console.log(`You are ${sessionStorage.getItem("username")} and playing in room number ${sessionStorage.getItem("room")}`);
		console.log(`There are ${players.length} people playing`);
    for(var i = 0; i < players.length; i++) {
        if(sessionStorage.getItem("room") == players[i].room) {
            player = document.createElement("p");
            playerList.appendChild(player);
            player.innerText = username[i];
            player.id = "list-element";
        }
        console.log(players[i]);
    }
});

window.onload = function(event) {
	socket.emit('join', sessionStorage.getItem("username"),sessionStorage.getItem("room"));
}