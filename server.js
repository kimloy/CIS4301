var express = require('express');
var app = express();
var db = new sqlite3.Database('db/flowers2019.db');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

app.get('/', function (request, response) {
    response.send("Hello World")
});