var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cron = require('./crons/smsTomorrow');
var config = require('./config');

var mongoose = require('mongoose');
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.mongoURI, { useNewUrlParser: true }, function(err) {
  if (err) {
    console.log(err);
  }
});

app.use(bodyParser.json());
app.use(require('./routes/clients'));
app.use(require('./routes/appointments'));

app.listen(config.port);

cron.runSMS();
