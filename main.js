const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cron = require('./crons/smsTomorrow');
const crons = require('./crons/smsWeek');
const config = require('./config');
const cors = require('cors');

const mongoose = require('mongoose');

app.use(cors());

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.mongoURI, { useNewUrlParser: true }, function(err) {
  if (err) {
    console.log(err);
  }
});

app.use(bodyParser.json());
app.use(require('./middleware/chekObjectId'));
app.use(require('./middleware/postUser'));
app.use(require('./middleware/validateDate'));

app.use(require('./routes/clients'));
app.use(require('./routes/appointments'));

app.listen(config.port);

cron.runSMS();
crons.runSMSWeek();
