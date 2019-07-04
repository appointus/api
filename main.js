var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var uristring = 'mongodb://localhost:27017/appointus';
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(uristring, { useNewUrlParser: true }, function(err) {
  if (err) {
    console.log(err);
  }
});

app.use(bodyParser.json());
app.use(require('./routes/clients'));
app.use(require('./routes/appointments'));

app.listen(3000);
