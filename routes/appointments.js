const router = require('express').Router();
var Appointment = require('../models/appointments');
const turboSms = require('./../utils/turboSms');
const Client = require('../models/clients');

router.get('/appointments/:date', function(req, res) {
  Appointment.find({ date: req.params.date }).populate('client').exec(function(err, client) {
    if (err) console.error(err);
    res.send(client);
  });
});

router.post('/appointments', function(req, res) {
  var appointmentToAdd = new Appointment({
    date: req.body.date,
    time: req.body.time,
    client: req.body.client
  });
  appointmentToAdd.save(function(err, appointment) {
    if (err) console.log(err);
    res.send(appointment);
    Client.findById(appointment.client, function(err, clients) {
      if (err) console.log(err);

      turboSms.sendSmsClient(
        `${clients.phone}`,
        `Dear ${clients.first_name} ${clients.last_name},  we notify you that you have new appointment on ${appointment.date}, at ${appointment.time} `
      );
    });
  });
});

module.exports = router;
