var socket = io();
var bk = document.createElement("img");
var matzah = document.createElement("img");
matzah.style.display = "none";
bk.style.display = "none"
bk.id = "background";
matzah.id = "matzah";
document.getElementById("game").appendChild(bk);
document.getElementById("game").appendChild(matzah);
bk.src = "./background.png";
matzah.src = "./matzah.png";
matzah.style.display = "block";
bk.style.display = "block"
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