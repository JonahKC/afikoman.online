var socket = io();

sessionStorage

//window.onload = function() {
	socket.emit('join', sessionStorage.getItem("username"),sessionStorage.getItem("room"));
//}

socket.on('playerData', function(isOwner) {
  console.log(isOwner);
});