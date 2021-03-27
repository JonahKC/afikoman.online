var socket = io();

sessionStorage

//window.onload = function() {
socket.emit('join', sessionStorage.getItem("username"),sessionStorage.getItem("room"));
//}

socket.on('playerData', function(isOwner) {
  console.log(isOwner);
});

socket.on('hostbk', function(_bk) {
	//set id to name of background.j
	document.getElementById("background").src = _bk;
	document.getElementById("matzah").style.display = 'block';
	document.getElementById("matzah").style.width
});