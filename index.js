var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json({ extended: false });
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

app.get("/clients", jsonParser, function(req, res) {
  var mongoClient = new MongoClient(url, { useNewUrlParser: true });
  return mongoClient.connect(function(err, client) {
    if (err) return res.send(err).status(503);
    var db = client.db("clientsDB");
    var coll = db.collection("clientsCol");

    return coll.find().toArray(function(err, result) {
      if (err) return res.send(err).status(503);
      res.send(result);
      client.close();
    });
  });
});
app.post("/clients", jsonParser, function(req, res) {
  var mongoClient = new MongoClient(url, { useNewUrlParser: true });
  return mongoClient.connect(function(err, client) {
    if (err) return res.send(err).status(503);
    var db = client.db("clientsDB");
    var coll = db.collection("clientsCol");

    return coll.insertOne(req.body, function(err, result) {
      if (err) return res.send(err).status(503);
      res.send({ result: result });
      client.close();
    });
  });
});

app.listen(3000);
