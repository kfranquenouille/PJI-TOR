var http = require('http');
var port = 9000;

if(process.argv.length > 2) {
	port = process.argv[2];
}

httpServer = http.createServer(function(req, res) {
	res.end('Hello World');
});

httpServer.listen(port);

var io = require('socket.io').listen(httpServer);
var io_client_connected = false;
var io_client;

io.sockets.on('connection', function(socket) {
	console.log('new user');

	socket.on('msg', function(msg) {
		msg.type = 'usermsg';
		io.sockets.emit('msg', msg);

		if(msg.nodes.length > 0) {
			var next_node = 'http://' + msg.nodes[0];
			msg.nodes = msg.nodes.slice(1);

			if(!io_client_connected) {
				io_client = require("socket.io-client")(next_node);
			} else {
				io_client.emit('msg', msg);			
			}

			io_client.on('connect', function() {
				io_client_connected = true;
				io_client.emit('msg', msg);
			});

			io_client.on('disconnect', function() {
				io_client_connected = false;
			});	
		}
	});
});