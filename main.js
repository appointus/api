var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var uristring = 'mongodb://localhost:27017/appointus';

mongoose.connect(uristring, { useNewUrlParser: true }, function(err) {
  if (err) {
    console.log(err);
  }
});

app.use(bodyParser.json());
app.use(require('./routes/clientsroute'));
app.use(require('./routes/appointmentsroute'));

app.listen(3000);
