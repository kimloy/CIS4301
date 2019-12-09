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
        "ORDER BY SIGHTINGS.sighted desc LIMIT 10;"

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

app.post('/getFlower', function(req, res){
    console.log(req.body);
    var comName = req.body;
    var comName = comName.COMNAME;
    console.log(comName)
    var sql = "Select * From Flowers\n" +
               "where comname = ?;"

    db.all(sql, [comName], function(err, rows){
        if(err)
            console.log("Error: " + err);
        else
        {
            console.log(rows);
            res.status(201);
            res.send(rows).end();
        }
    })
});

app.post('/editData', function(req,res)
{
   console.log("edit post came in");
   console.log(req.body);
   var userEdit = req.body;
   db.run(
       'UPDATE Flowers SET genus = $Genus, species = $Species WHERE comname = $Comname;',
       {
           $Comname: userEdit.COMNAME,
           $Species: userEdit.SPECIES,
           $Genus: userEdit.GENUS
       },
       // callback function to run when the query finishes:
       (err) => {
           if (err) {
               res.send({message: 'error in app.post(/updateF)'});
           } else {
               res.send({message: 'Successfully updated flowers if Comname exists.'});
           }
       }
   );
})

app.post('/insertData', function(req, res){
    console.log(req.body);
    var newName = req.body.NAME;
    var newPerson = req.body.PERSON;
    var newLocation = req.body.LOCATION;
    var newSighted = req.body.SIGHTED;

    db.run('INSERT INTO SIGHTINGS VALUES($NAME, $PERSON, $LOCATION, $SIGHTED);',
        {
            $NAME: newName,
            $PERSON: newPerson,
            $LOCATION: newLocation,
            $SIGHTED: newSighted
        },
        (err) =>
        {
            if (err)
                res.send(err);
            else
                res.send("insert was a success");
        }
    );
});