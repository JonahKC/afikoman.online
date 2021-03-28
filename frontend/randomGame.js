var id;
function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
document.getElementById("cgid").onclick = function() {
    id = randomInt(100000, 999999);
    document.getElementById("gameid").innerText = "ID: " + id;
    document.getElementById("jgid").value = id
    room = id;
}