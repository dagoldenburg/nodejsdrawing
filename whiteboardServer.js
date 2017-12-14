var express = require('express');
var fs = require('fs');
var app = express();
var expressWs = require('express-ws')(app);

var clickX = new Array();
var clickY = new Array();

app.get('/', function(req, res){
    console.log('GET /')
    var html = fs.readFileSync('whiteboard.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
  	var data = JSON.parse(msg)
    console.log("msg "+msg);
    console.log("msglength "+msg.length)
    for(var i=0;i<data.x.length;i++){
    		clickX.push(data.x[i])
    	}
    	for(var i=0;i<data.y.length;i++){
    		clickY.push(data.y[i])
    	}
  });
  console.log('socket', req.testing);
});

app.ws('/getcords',function(ws,res){
	ws.on('message',function(msg){
    var slicePoint = msg;
    ws.send(JSON.stringify({"nr":clickX.length,
    		  "x":clickX.slice(slicePoint,clickX.length),
			  "y":clickY.slice(slicePoint,clickY.length)}))
	});
});

app.get('/erase', function(req, res){
	try{
		console.log('POST /');
		clickX=new Array();
		clickY=new Array();
	}catch(err){
		console.log(err)
	}
});

app.timeout = 5000;
port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port)