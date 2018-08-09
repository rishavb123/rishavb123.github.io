//Make connection
let socket = io.connect('http://73.178.142.232:3000');

socket.emit('type', "player");
