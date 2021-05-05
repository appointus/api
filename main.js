const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cron = require('./crons/smsTomorrow');
const crons = require('./crons/smsWeek');
const config = require('./config');
const cors = require('cors');
require('dotenv').config()

const mongoose = require('mongoose');

app.use(cors());

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, function(err) {
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

app.listen(process.env.PORT);

cron.runSMS();
crons.runSMSWeek();
console.log('Inited')