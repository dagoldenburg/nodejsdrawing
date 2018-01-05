var express = require('express');
var fs = require('fs');
var app = express();
var expressWs = require('express-ws')(app);



app.get('/', function(req, res){

fs.appendFile("test.txt", "bajs", function(err) {
    if(err) {
        return console.log(err);
    }
});

    console.log("The file was saved!");
});

port = 3000;
app.listen(port);