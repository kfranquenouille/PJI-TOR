<?php
$host = '127.0.0.1'; //host
$port = 9000; //port

if(count($argv) > 1) {
	$port = $argv[1]; 
}

$null = NULL; //null var

//Create TCP/IP sream socket
$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
//reuseable port
socket_set_option($socket, SOL_SOCKET, SO_REUSEADDR, 1);

//bind socket to specified host
socket_bind($socket, 0, $port);

//listen to port
socket_listen($socket);

//create & add listning socket to the list
$clients = array($socket);

$clients_relay = array();

//start endless loop, so that our script doesn't stop
while (true) {
	//manage multipal connections
	$changed = $clients;

	//suppress the socket resources which are don't ready to read in $changed array
	socket_select($changed, $null, $null, 0, 10);
	
	//check for new socket
	if (in_array($socket, $changed)) {
		$socket_new = socket_accept($socket); //accpet new socket
		$clients[] = $socket_new; //add socket to client array
		
		$header = socket_read($socket_new, 1024); //read data sent by the socket
		perform_handshaking($header, $socket_new, $host, $port); //perform websocket handshake
		
		socket_getpeername($socket_new, $ip); //get ip address of connected socket
		$response = mask(json_encode(array('type'=>'system', 'message'=>$ip.' connected'))); //prepare json data
		send_message($response); //notify all users about new connection
		
		//make room for new socket
		$found_socket = array_search($socket, $changed);
		unset($changed[$found_socket]);
	}
	
	//loop through all connected sockets
	foreach ($changed as $changed_socket) {
		
		//check for any incomming data
		while(socket_recv($changed_socket, $buf, 1024, 0) >= 1)
		{
			$received_text = $buf;

			if(!in_array($changed_socket, $clients_relay)) {
				$received_text = unmask($buf); //unmask data	
			}

			$tst_msg = json_decode($received_text); //json decode 

			$user_name = $tst_msg->name; //sender name
			$user_message = $tst_msg->message; //message text
			$user_color = $tst_msg->color; //color

			if(is_array($tst_msg->nodes)) {
				$nodes = $tst_msg->nodes; //nodes list (can be empty)
			} else {
				$nodes = array();
				foreach ($tst_msg->nodes as $v) {
					$nodes[] = $v;
				}
			}

			if(empty($nodes)) {
				//prepare data to be sent to client
				$response_text = mask(json_encode(array('type'=>'usermsg', 'name'=>$user_name, 'message'=>$user_message, 'color'=>$user_color)));
				send_message($response_text); //send data
			} else {
				$addr = explode(':', $nodes[0]);
				$socket_node = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
				socket_connect($socket_node, $addr[0], $addr[1]);

				$handshake_msg  = "GET / HTTP/1.1\r\n" .
				"Upgrade: websocket\r\n" .
				"Connection: Upgrade\r\n" .
				"Host: $host:$port\r\n" .
				"WebSocket-Origin: $host\r\n" .
				"Sec-WebSocket-Key: k2towQT28s50DtKptTjZbg==\r\n" .
				"Sec-WebSocket-Version: 13\r\n" .
				"Type-node: relay\r\n\r\n";
				@socket_write($socket_node,$handshake_msg,strlen($handshake_msg));

				unset($nodes[0]);

				$msg_to_client = json_encode(array('nodes'=>$nodes, 'name'=>$user_name, 'message'=>$user_message, 'color'=>$user_color));

				sleep(1);

				@socket_write($socket_node,$msg_to_client,strlen($msg_to_client));
				socket_close($socket_node);
			}
			break 2; //exist this loop
		}
		
		$buf = @socket_read($changed_socket, 1024, PHP_NORMAL_READ);
		if ($buf === false) { // check disconnected client
			// remove client for $clients array
			$found_socket = array_search($changed_socket, $clients);
			socket_getpeername($changed_socket, $ip);
			unset($clients[$found_socket]);

			// remove socket for $clients_relay array
			$found_socket = array_search($changed_socket, $clients_relay);
			unset($clients_relay[$found_socket]);
			
			//notify all users about disconnected connection
			$response = mask(json_encode(array('type'=>'system', 'message'=>$ip.' disconnected')));
			send_message($response);
		}
	}
}
// close the listening socket
socket_close($sock);

function send_message($msg)
{
	global $clients;
	foreach($clients as $changed_socket)
	{
		@socket_write($changed_socket,$msg,strlen($msg));
	}
	return true;
}


//Unmask incoming framed message
function unmask($text) {
	$length = ord($text[1]) & 127;
	if($length == 126) {
		$masks = substr($text, 4, 4);
		$data = substr($text, 8);
	}
	elseif($length == 127) {
		$masks = substr($text, 10, 4);
		$data = substr($text, 14);
	}
	else {
		$masks = substr($text, 2, 4);
		$data = substr($text, 6);
	}
	$text = "";
	for ($i = 0; $i < strlen($data); ++$i) {
		$text .= $data[$i] ^ $masks[$i%4];
	}
	return $text;
}

//Encode message for transfer to client.
function mask($text)
{
	$b1 = 0x80 | (0x1 & 0x0f);
	$length = strlen($text);
	
	if($length <= 125)
		$header = pack('CC', $b1, $length);
	elseif($length > 125 && $length < 65536)
		$header = pack('CCn', $b1, 126, $length);
	elseif($length >= 65536)
		$header = pack('CCNN', $b1, 127, $length);
	return $header.$text;
}

//handshake new client.
function perform_handshaking($receved_header,$client_conn, $host, $port)
{
	global $clients_relay;
	$headers = array();
	$lines = preg_split("/\r\n/", $receved_header);
	foreach($lines as $line)
	{
		$line = chop($line);
		if(preg_match('/\A(\S+): (.*)\z/', $line, $matches))
		{
			$headers[$matches[1]] = $matches[2];
		}
	}

	// Checking relay
	if(isset($headers['Type-node']) && $headers['Type-node'] = 'relay') {
		$clients_relay[] = $client_conn; //add socket to client relay array
	}

	$secKey = $headers['Sec-WebSocket-Key'];
	$secAccept = base64_encode(pack('H*', sha1($secKey . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
	//hand shaking header
	$upgrade  = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" .
	"Upgrade: websocket\r\n" .
	"Connection: Upgrade\r\n" .
	"WebSocket-Origin: $host\r\n" .
	"WebSocket-Location: ws://$host:$port/demo/shout.php\r\n".
	"Sec-WebSocket-Accept:$secAccept\r\n\r\n";
	socket_write($client_conn,$upgrade,strlen($upgrade));
}