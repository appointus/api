var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cron = require('./crons/smsTomorrow');
var config = require('./config');
var cors = require('cors');

var mongoose = require('mongoose');

app.use(cors());

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
