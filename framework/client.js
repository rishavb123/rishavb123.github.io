//Make connection
let socket = io.connect('http://192.168.137.1:3000');

socket.emit('type', "player");
