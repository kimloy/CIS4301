var express = require('express');
var app = express();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('db/flowers2019.db');
var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();
})

app.get('/', function (request, response) {
    response.send("Hello World");
});

app.get('/latin', function(request, response){
   console.log('GET request received at /latin');
   db.all('SELECT COMNAME FROM FLOWERS', function (err, rows) {
        if(err)
            console.log("Error: " + err);
        else
            response.send(rows);
   })
});

app.post('/postDrop', function(req, res){
    console.log('post came in');
    console.log(req.body);
    var currentFlower = req.body;
    var currentFlower = currentFlower.dd;
    console.log(currentFlower);
    sql = "SELECT * from SIGHTINGS \n" +
        "where SIGHTINGS.name = ? \n" +
        "ORDER BY SIGHTINGS.sighted desc;"

    db.all(sql, [currentFlower], function(err, rows){
        if(err)
            console.log("Error: " + err );
        else
        {
            res.status(201)
            res.send(rows).end();
        }
    })
});