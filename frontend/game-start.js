var socket = io();

window.onload = function() {
	socket.emit('join', sessionStorage.getItem("username"),sessionStorage.getItem("room"));
}

socket.on('playerData', function(isOwner) {
  console.log(isOwner);
});