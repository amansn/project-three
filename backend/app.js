var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var app = express();

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

var MongoClient = mongodb.MongoClient;

var mongoUrl = 'mongo://localhost:27017';

app.get('/', function(request, response){
  response.json("frontend is connected to Backend")
});

app.listen(3000, function(){
  console.log('port 3000 is up and running');
});
