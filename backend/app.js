var express = require('express');
var cors = require('cors');
var fs = require('fs');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var MongoClient = mongodb.MongoClient;
var mongoUrl = 'mongodb://localhost:27017/delivery-chill';

app.get('/', function(request, response) {
  response.json({description: "This is the delivery & chill backend."});
});

app.get('/delivery/:id', function(request, response) {
  MongoClient.connect(mongoUrl, function(err, db) {
    var deliveryCollection = db.collection('delivery');
    if (err) {
      console.log("Error", err);
    } else {
      deliveryCollection.find({id: request.params.id}).toArray(function(err, result) {
        if (err) {
          console.log("Error:", err);
        } else if (result.length) {
          console.log("Found:", result);
          response.json(result);
        } else {
          console.log("No document(s) found.");
          deliveryCollection.insert({id: request.params.id, favorites: 0}, function(err, result) {
            if (err) {
              console.log("Error:", err);
            } else {
              console.log("Created new document with favorites: 0.");
              console.log("Result:", result);
              response.json(result);
            }
          });
        }
        db.close(function() {
          console.log("Database closed.");
        });
      });
    }
  });
});

app.get('/delivery', function(request, response) {
  MongoClient.connect(mongoUrl, function(err, db) {
    var deliveryCollection = db.collection('delivery');
    if (err) {
      console.log("Error", err);
    } else {
      deliveryCollection.find().toArray(function(err, result) {
        if (err) {
          console.log("Error:", err);
        } else if (result.length) {
          console.log("Found:", result);
          response.json(result);
        } else {
          console.log("No document(s) found.");
        }
        db.close(function() {
          console.log("Database closed.");
        });
      });
    }
  });
});

app.post('/delivery/:id/add', function(request, response) {
  console.log("request.params", request.params);
  MongoClient.connect(mongoUrl, function(err, db) {
    var deliveryCollection = db.collection('delivery');
    if (err) {
      console.log("Unable to connect to MongoDB. Error:", err);
    } else {
      console.log("Saving favorite");
      deliveryCollection.find({id: request.params.id}).toArray(function(err, result) {
        if (err) {
          console.log("Error:", err);
        } else {
          console.log('result', result);
          if (!result.length) {
            var newDocument = {id: request.params.id, favorites: 0};
            deliveryCollection.insert(newDocument);
            result.push(newDocument);
            console.log('result new', result);
          }
          var favorites = result[0].favorites;
          var newFavorites = favorites + 1;
          var newResult = {id: request.params.id, favorites: newFavorites};

          deliveryCollection.update({id: request.params.id}, newResult, function(err, result) {
            if (err) {
              console.log("Error:", err);
            } else {
              response.json(result)
            }
            db.close(function() {
              console.log("Database closed.");
            });
          })
        }
      })
    }
  })
});

app.post('/delivery/:id/remove', function(request, response) {
  console.log("request.params", request.params);
  MongoClient.connect(mongoUrl, function(err, db) {
    var deliveryCollection = db.collection('delivery');
    if (err) {
      console.log("Unable to connect to MongoDB. Error:", err);
    } else {
      console.log("Removing favorite");
      deliveryCollection.find({id: request.params.id}).toArray(function(err, result) {
        if (err) {
          console.log("Error:", err);
        } else {
          console.log('result', result);

          var favorites = result[0].favorites;
          var newFavorites = favorites - 1;
          var newResult = {id: request.params.id, favorites: newFavorites};

          deliveryCollection.update({id: request.params.id}, newResult, function(err, result) {
            if (err) {
              console.log("Error:", err);
            } else {
              response.json(result)
            }
            db.close(function() {
              console.log("Database closed.");
            });
          })
        }
      })
    }
  })
});

//Watch tv/movies routes

app.get('/watch/:id', function(request, response) {
  MongoClient.connect(mongoUrl, function(err, db) {
    var watchCollection = db.collection('watching');
    if (err) {
      console.log("Error", err);
    } else {
      watchCollection.find({id: request.params.id}).toArray(function(err, result) {
        if (err) {
          console.log("Error:", err);
        } else if (result.length) {
          console.log("Found:", result);
          response.json(result);
        } else {
          console.log("No document(s) found.");
          watchCollection.insert({id: request.params.id, favorites: 0}, function(err, result) {
            if (err) {
              console.log("Error:", err);
            } else {
              console.log("Created new document with favorites: 0.");
              console.log("Result:", result);
              response.json(result);
            }
          });
        }
        db.close(function() {
          console.log("Database closed.");
        });
      });
    }
  });
});

app.get('/watch', function(request, response) {
  MongoClient.connect(mongoUrl, function(err, db) {
    var watchCollection = db.collection('watching');
    if (err) {
      console.log("Error", err);
    } else {
      watchCollection.find().toArray(function(err, result) {
        if (err) {
          console.log("Error:", err);
        } else if (result.length) {
          console.log("Found:", result);
          response.json(result);
        } else {
          console.log("No document(s) found.");
        }
        db.close(function() {
          console.log("Database closed.");
        });
      });
    }
  });
});

app.post('/watch/:id/add', function(request, response) {
  console.log("request.params", request.params);
  MongoClient.connect(mongoUrl, function(err, db) {
    var watchCollection = db.collection('watching');
    if (err) {
      console.log("Unable to connect to MongoDB. Error:", err);
    } else {
      console.log("Saving favorite");
      watchCollection.find({id: request.params.id}).toArray(function(err, result) {
        if (err) {
          console.log("Error:", err);
        } else {
          console.log('result', result);
          if (!result.length) {
            var newDocument = {id: request.params.id, favorites: 0};
            watchCollection.insert(newDocument);
            result.push(newDocument);
            console.log('result new', result);
          }
          var favorites = result[0].favorites;
          var newFavorites = favorites + 1;
          var newResult = {id: request.params.id, favorites: newFavorites};

          watchCollection.update({id: request.params.id}, newResult, function(err, result) {
            if (err) {
              console.log("Error:", err);
            } else {
              response.json(result)
            }
            db.close(function() {
              console.log("Database closed.");
            });
          })
        }
      })
    }
  })
});

app.post('/watch/:id/remove', function(request, response) {
  console.log("request.params", request.params);
  MongoClient.connect(mongoUrl, function(err, db) {
    var watchCollection = db.collection('watching');
    if (err) {
      console.log("Unable to connect to MongoDB. Error:", err);
    } else {
      console.log("Removing favorite");
      watchCollection.find({id: request.params.id}).toArray(function(err, result) {
        if (err) {
          console.log("Error:", err);
        } else {
          console.log('result', result);

          var favorites = result[0].favorites;
          var newFavorites = favorites - 1;
          var newResult = {id: request.params.id, favorites: newFavorites};

          watchCollection.update({id: request.params.id}, newResult, function(err, result) {
            if (err) {
              console.log("Error:", err);
            } else {
              response.json(result)
            }
            db.close(function() {
              console.log("Database closed.");
            });
          })
        }
      })
    }
  })
});


app.listen(3000, function() {
  console.log("Listening on port 3000");
});
