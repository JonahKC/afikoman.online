var socket = io();

//window.onload = function() {
	socket.emit('join', sessionStorage.getItem("username"),sessionStorage.getItem("room"));
	console.log(win_button_coords);
//}

socket.on('playerData', function(isOwner) {
  console.log(isOwner);
});