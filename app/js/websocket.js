websocket = {};
websocket.startWebSocket = function() {

    //var connectionString = "ws://192.168.1.154:8001/"
    var connectionString = "ws://192.168.1.36:9001/";
    window.ws = new WebSocket(connectionString);
    console.log("We're trying to connect to " + connectionString);

    window.ws.onopen = function() {
        console.log("We successfully connected to " + connectionString);
//      window.ws.send("Hello Mr. Server!");
    };


    window.ws.onerror = function (e) { 
        console.log("Error");
        console.log(e);
        console.log(e.data); 
    };
    

    window.ws.onmessage = function (e) { 
        console.log(e);
        console.log(e.data); 
    };

    window.ws.onclose = function() { 
        console.log ("we closed the websocket connection for some reason");
    };

}

websocket.sendMessage = function(msg) {
  window.ws.send(msg);
}


