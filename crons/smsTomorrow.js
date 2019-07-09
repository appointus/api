const soap = require('soap');
const Cookie = require('soap-cookie');
const schedule = require('node-schedule');
const moment = require('moment');
const Appointment = require('../models/appointments');
const turboSms = require('../utils/turboSms');
const url = 'http://turbosms.in.ua/api/wsdl.html';
const tomorrowSchedule = '00 19 * * *';

exports.runSMS = function() {
  schedule.scheduleJob(tomorrowSchedule, function() {
    // Prepare tomorrow's date
    const tomorrow = moment().add(1, 'day');
    const year = tomorrow.year().toString();
    const month = (tomorrow.month() + 1).toString().padStart(2, '0');
    const day = tomorrow.date().toString().padStart(2, '0');
    const date = year + '-' + month + '-' + day;

    // Connect to TurboSMS
    Appointment.find({ date }).populate('client').exec(function(err, appoints) {
      if (err) console.error(err);
      // Send SMS to all clients of tomorrow's appointmens
      appoints.forEach((appoint) => {
        turboSms.sendSmsClient(
          `${appoint.client.phone}`,
          `Dear ${appoint.client.first_name} ${appoint.client
            .last_name}, we remind you that next week, ${appoint.date}, at ${appoint.time} you have appointment.`
        );
      });
    });
  });
};
