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
router.put('/appointments/:id', function(req, res) {
  if (Object.keys(req.body).length === 0) res.status(500).send('Error');
  var newAppointment = {};
  const allowedProps = [ 'date', 'time' ];
  allowedProps.forEach((prop) => {
    if (req.body.hasOwnProperty(prop)) newAppointment[prop] = req.body[prop];
  });

  Appointment.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: newAppointment
    },
    { new: true },
    function(err, doc) {
      if (err) console.log(err);
      res.send(doc);
    }
  );
});
router.delete('/appointments/:id/delete', function(req, res) {
  Appointment.deleteOne({ _id: req.params.id }, function(err, result) {
    if (err) console.log(err);
    res.send(result);
  });
});
module.exports = router;
