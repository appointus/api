const router = require('express').Router();
var Appointment = require('../models/appointments');
var moment = require('moment');

const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');
const Joi = BaseJoi.extend(Extension);

router.get('/appointments/:date', function(req, res) {
  Appointment.find({ date: req.params.date }).populate('client').exec(function(err, client) {
    if (err) console.error(err);
    res.send(client);
  });
});

router.post('/appointments', function(req, res) {
  var currentDate = moment().format('YYYY-MM-DD');
  var currentTime = moment().format('H:mm');
  const { error } = validateAppointment(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (
    moment(currentDate).isAfter(req.body.date) ||
    (moment(currentDate).isSame(req.body.date) && currentTime >= req.body.time)
  )
    return res.status(400).send('It is not possible to add an appointment in the past');
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

function validateAppointment(appointment) {
  const schema = {
    date: Joi.date().format('YYYY-MM-DD').required(),
    time: Joi.date().format('H:mm').required(),
    client: Joi.string().required()
  };
  return Joi.validate(appointment, schema);
}

module.exports = router;
