var http = require('http');
var port = 9000;

if(process.argv.length > 2) {
	port = process.argv[2];
}

httpServer = http.createServer(function(req, res){
	res.end('Hello World');
});

httpServer.listen(port);

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', function(socket){
	console.log('new user');

	socket.on('msg', function(msg) {
		msg.type = 'usermsg';
		io.sockets.emit('msg', msg);
	});
});