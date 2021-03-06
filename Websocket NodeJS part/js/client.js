$(document).ready(function(){

	// Params 
	var node_addr = 'http://127.0.0.1:9000';
	var nodes_list = ["127.0.0.1:9001", "127.0.0.1:9002"];
	var colours = ['007AFF','FF7000','FF7000','15E25F','CFC700','CFC700','CF1100','CF00BE','F00'];
	var user_colour = colours[Math.floor(Math.random()*colours.length)];

	// Connect to the first node
	var socket = io.connect(node_addr);

	socket.on('connect', function() {
		$('#message_box').append("<div class=\"system_msg\">Connected!</div>"); //notify user
		$("#message_box").scrollTop($("#message_box")[0].scrollHeight);
	});

	socket.on('disconnect', function() {
		$('#message_box').append("<div class=\"system_msg\">Connection Closed</div>");
		$("#message_box").scrollTop($("#message_box")[0].scrollHeight);
	});

	socket.on('error', function() {
		$('#message_box').append("<div class=\"system_error\">Error Occurred</div>");
		$("#message_box").scrollTop($("#message_box")[0].scrollHeight);
	});

	//#### Message received from server?
	socket.on('msg', function(msg) {
		var type = msg.type; //message type
		var umsg = msg.message; //message text
		var uname = msg.name; //user name
		var ucolor = msg.color; //color

		if(type == 'usermsg') 
		{
			$('#message_box').append("<div><span class=\"user_name\" style=\"color:#"+ucolor+"\">"+uname+"</span> : <span class=\"user_message\">"+umsg+"</span></div>");
		}
		if(type == 'system')
		{
			$('#message_box').append("<div class=\"system_msg\">"+umsg+"</div>");
		}	
		
		$('#message').val(''); //reset text
		$("#message_box").scrollTop($("#message_box")[0].scrollHeight);	
	});

	// Send a message
	$('#send-btn').click(function() { //use clicks message send button	
		var mymessage = $('#message').val(); //get message text
		var myname = $('#name').val(); //get user name
		
		if(myname == ""){ //empty name?
			alert("Enter your Name please!");
			return;
		}
		if(mymessage == ""){ //emtpy message?
			alert("Enter Some message Please!");
			return;
		}
		
		//prepare json data
		var msg = {
			message: mymessage,
			name: myname,
			color : user_colour,
			nodes : nodes_list // node path to the client
		};
		//send data to server
		socket.emit('msg', msg);
	});
});