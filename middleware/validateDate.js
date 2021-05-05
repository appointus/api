const router = require('express').Router();

const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');
const Joi = BaseJoi.extend(Extension);
const moment = require('moment');

router.post('/appointments', function(req, res,next) {
    const currentDate = moment().format('YYYY-MM-DD');
    const currentTime = moment().format('H:mm');
    const error = validateAppointment(req.body);
    if (error.date?.error || error.time?.error || error.client?.error){
        next('error');
        return res.status(400).send(`validation error: ${error.date?.error && "date" || error.time?.error && "time" || error.client?.error && "client"}`);
    }
    if (
      moment(currentDate).isAfter(req.body.date) ||
      (moment(currentDate).isSame(req.body.date) && currentTime >= req.body.time)
    ){
        next('error')
        return res.status(400).send('It is not possible to add an appointment in the past');  
    }
    next()
});

function validateAppointment(appointment) {
    return {
      date: Joi.date().format('YYYY-MM-DD').utc().required().validate(appointment.date),
      time: Joi.date().format('H:mm').utc().required().validate(appointment.time),
      client: Joi.string().required().validate(appointment.client)
    }
  }

module.exports = router;
