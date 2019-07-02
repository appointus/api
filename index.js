var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json({ extended: false });
var mongoose = require("mongoose");
var uristring = "mongodb://localhost:27017/appointus";

var clientSchema = new mongoose.Schema({
  first_name: { type: String, trim: true },
  last_name: { type: String, trim: true },
  phone: { type: Number }
});
var clients = mongoose.model("clients", clientSchema);
mongoose.connect(uristring, { useNewUrlParser: true }, function(err) {
  if (err) {
    console.log(err);
  }
});

app.get("/clients", jsonParser, function(req, res) {
  clients.find(function(err, clients) {
    if (err) return console.error(err);
    res.send(clients);
  });
});

app.post("/clients", jsonParser, function(req, res) {
  var clientToAdd = new clients({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone
  });
  clientToAdd.save(function(err, client) {
    if (err) console.log("Error on save!");
    res.send(client);
  });
});

app.listen(3000);
