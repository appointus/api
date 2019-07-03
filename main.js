var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var uristring = "mongodb://localhost:27017/appointus";
var Client = require("./models/clients");
var Appointment = require("./models/appointments");

mongoose.connect(uristring, { useNewUrlParser: true }, function(err) {
  if (err) {
    console.log(err);
  }
});

app.use(bodyParser.json());

app.get("/clients", function(req, res) {
  Client.find(function(err, clients) {
    if (err) return console.error(err);
    res.send(clients);
  });
});

app.post("/clients", function(req, res) {
  var clientToAdd = new Client({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone
  });
  clientToAdd.save(function(err, client) {
    if (err) console.log("Error on save!");
    res.send(client);
  });
});

app.get("/appointments", function(req, res) {
  Appointment.find({ date: req.body.date })
    .populate("client")
    .exec(function(err, client) {
      if (err) console.error(err);
      res.send(client);
    });
});

app.post("/appointments", function(req, res) {
  var appointmentToAdd = new Appointment({
    date: req.body.date,
    time: req.body.time,
    client: req.body.client
  });
  appointmentToAdd.save(function(err, appointment) {
    if (err) console.log(err);
    res.send(appointment);
  });
});

app.listen(3000);
