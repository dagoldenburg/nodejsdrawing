var express = require('express');
var fs = require('fs');
var app = express();
var expressWs = require('express-ws')(app);



app.get('/', function(req, res){

fs.appendFile("test.txt", "", function(err) {
    if(err) {
        return console.log(err);
    }
});
    console.log("The file was reset!");
});

app.post('/upload', function(res, req) {
	console.log("hejhejhej")
  res.on('data', function(msg) {
  	console.log(msg)
  	fs.appendFile("test.txt","hej",function(err){
  		if(err){
  			return console.log(err);
  		}
  	});
  });
});

port = 3000;
app.listen(port);