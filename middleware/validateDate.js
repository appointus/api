const router = require('express').Router();

const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');
const Joi = BaseJoi.extend(Extension);
const moment = require('moment');

router.post('/appointments', function(req, res,next) {
    const currentDate = moment().format('YYYY-MM-DD');
    const currentTime = moment().format('H:mm');
    const { error } = validateAppointment(req.body);
    if (error){
        next('error') 
        return res.status(400).send(error.details[0].message);
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
    const schema = {
      date: Joi.date().format('YYYY-MM-DD').required(),
      time: Joi.date().format('H:mm').required(),
      client: Joi.string().required()
    };
    return Joi.validate(appointment, schema);
  }
module.exports = router;
