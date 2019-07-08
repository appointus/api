const turboSms = require('../utils/turboSms');
const Appointment = require('../models/appointments');

exports.sendSms = function(appointId) {
  Appointment.find({ _id: appointId }).populate('client').exec(function(err, appoints) {
    if (err) console.error(err);
    // Send SMS to all clients of tomorrow's appointmens
    appoints.forEach((appoint) => {
      turboSms.sendSmsClient(
        `${appoint.client.phone}`,
        `Dear ${appoint.client.first_name} ${appoint.client
          .last_name},  we notify you that you have new appointment on ${appoint.date}, at ${appoint.time}`
      );
    });
  });
};
