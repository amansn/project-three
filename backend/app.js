import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongodb from 'mongodb';

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

var MongoClient = mongodb.MongoClient;

var mongoUrl = 'mongo://localhost:27017';

app.get('/', function(request, response){
  response.json("frontend is connected to Backend")
});
