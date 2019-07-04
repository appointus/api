const router = require('express').Router();
var Appointment = require('../models/appointments');

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
  });
});

module.exports = router;
