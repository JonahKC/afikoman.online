//Picks a random number from min to max
function randInt(min, max) {
		console.log("Random int func called")
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var socket = io();
var ownerBk;
//sessionStorage

window.onload = function() {
	socket.emit('join', sessionStorage.getItem('username'), sessionStorage.getItem("room"));
}

socket.on('playerData', function(isOwner) {
  console.log(isOwner);
});

socket.on('hostbkreceive', function(_bk) {
	console.log('BACKGROUND: ' + _bk);
	document.getElementById("background").src = _bk;
	document.getElementById("background").id = _bk;
	document.getElementById("matzah").style.display = 'block';
	//document.getElementById("matzah").style.width
});

var bk = document.createElement("img");
var matzah = document.createElement("button");

matzah.style.display = "none";
bk.style.display = "none"

const IMAGE_SCALE = [4032, 3024];

window.onload = function(e) {
	console.log("Windows.onload()")
	document.getElementById("game").appendChild(bk);
	document.getElementById("game").appendChild(matzah);
}
bk.id = "background";
matzah.id = "matzah";
matzah.setAttribute('class', "invisbutton");
bk.draggable = false;
bk.style.textAlign = "center";
bk.width = IMAGE_SCALE[0] / 4;
bk.height = IMAGE_SCALE[1] / 4;
matzah.style.display = "block";
bk.style.display = "block"

socket.on('plz-do-something', () => {
	console.log("Woohoo! I did something")
})

socket.on('playerData', function(isOwner) {
	console.log("hello, anyone?")
	if(isOwner) {
		ownerBk = `./images/bk_${randInt(1, 3)}_${randInt(0, 3)}.jpg`;
		console.log(ownerBk);
		socket.emit('hostBk', ownerBk);
	}
});
socket.on('hostbkreceive', function(_bk) {
	console.log(_bk)
	bk.src = _bk;
});
socket.on('showgame', function() 
{
		console.log("Showgame");
    matzah.style.display = "block";
    bk.style.display = "block"
});
socket.on('win', function(username, winRoom) {
    if(sessionStorage.getItem("room") == winRoom) {
        document.getElementById("win").innerText = username + " has won!";
        document.getElementById("win").style.display = "block";
        document.getElementById("winBk").style.display = "block";
    }
});
matzah.onclick = function() {
		console.log("Matzah clicked");
    socket.emit('win', sessionStorage.getItem("username"), sessionStorage.getItem("room"));
}