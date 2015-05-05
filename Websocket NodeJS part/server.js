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

// Crypto
var crypto = require('./lib/webcrypto/subtlecrypto');
var keyGenerate1;
var encryptedMsg;
var compteur = 0;

var handle_error = function (error) {
 	console.log("Error:");
 	console.log(error);  
};

function asciiToUint8Array(str) {
	var chars = [];
	for (var i = 0; i < str.length; ++i)
		chars.push(str.charCodeAt(i));
	return new Uint8Array(chars);
}

function uint8ArrayToAscii(tab) {
	var string = "";
	for (var i = 0; i < tab.length; i++) {
		string += String.fromCharCode(tab[i]);
	}
	return string;
}

function encryptData(key, data) {
	var temp;
	compteur += 1;
	crypto.crypto.subtle.encrypt({name: "RSA-OAEP"}, key.publicKey, data).then(function (ct1) {
		/*console.log("RSA-OAEP encrypt "+compteur+" :");
		temp = new Uint8Array(ct1);
		encryptedMsg = new Uint8Array(ct1);
		console.log(uint8ArrayToAscii(temp));*/
	}, handle_error);
	return temp;
}

crypto.crypto.subtle.generateKey({name: "RSA-OAEP", modulusLength: 512, publicExponent: new Uint8Array([0x01, 0x00, 0x01]), hash: {name: "SHA-1"}}, true, ["encrypt", "decrypt"]).then(function (key) {
	keyGenerate1 = key;
	console.log(keyGenerate1);

	encryptData(keyGenerate1, asciiToUint8Array('Salut'));
}, handle_error);
