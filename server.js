var express = require('express');
var app = express();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('db/flowers2019.db');
var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: false}));

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

app.get('/', function (request, response) {
    response.send("Hello World");
});

app.get('/latin', function(request, response){
   console.log('GET request received at /latin');
   db.all('SELECT genus, species FROM FLOWERS', function (err, rows) {
        if(err)
            console.log("Error: " + err);
        else
            response.send(rows);
   })
});