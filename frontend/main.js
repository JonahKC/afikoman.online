//Picks a random number from min to max
function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var socket = io();
var bk = document.createElement("img");
var matzah = document.createElement("button");
matzah.style.display = "none";
bk.style.display = "none"

const IMAGE_SCALE = [4032, 3024];

window.onload = function(event) {
	bk.id = "background";
	matzah.id = "matzah";
	matzah.setAttribute('class', "invisbutton");
	document.getElementById("game").appendChild(bk);
	document.getElementById("game").appendChild(matzah);
	bk.src = `./images/bk_${randInt(1, 3)}_${randInt(0, 3)}.jpg`;
	bk.draggable = false;
	bk.style.textAlign = "center";
	bk.width = IMAGE_SCALE[0] / 4;
	bk.height = IMAGE_SCALE[1] / 4;
	matzah.style.display = "block";
	bk.style.display = "block"
}
socket.on('showgame', function() {
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
    socket.emit('win', sessionStorage.getItem("username"), sessionStorage.getItem("room"));
}