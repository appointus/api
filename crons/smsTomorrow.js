const soap = require('soap');
const Cookie = require('soap-cookie');
const schedule = require('node-schedule');
const moment = require('moment');
const Appointment = require('../models/appointments');

const url = 'http://turbosms.in.ua/api/wsdl.html';
const sender = 'Msg';
const authData = { login: '', password: '' };
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
    soap.createClient(url, function(error, smsClient) {
      smsClient.Auth(authData, function(error, result) {
        // Set cookie
        smsClient.setSecurity(new Cookie(smsClient.lastResponseHeaders));
        Appointment.find({ date }).populate('client').exec(function(err, appoints) {
          if (err) console.error(err);
          // Send SMS to all clients of tomorrow's appointmens
          appoints.forEach((appoint) => {
            smsClient.SendSMS(
              {
                sender,
                destination: `${appoint.client.phone}`,
                text: `${appoint.client.first_name} ${appoint.client
                  .last_name}, we remind you that Tomorrow, ${appoint.date}, at ${appoint.time} you have a meeting.`
              },
              function(error, result) {
                if (err) console.error(err);
                console.log('cron - smsTomorrow');
              }
            );
          });
        });
      });
    });
  });
};
