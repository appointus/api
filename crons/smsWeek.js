const schedule = require('node-schedule')
const moment = require('moment')
const Appointment = require('../models/appointments')
const turboSms = require('../utils/turboSms')

const weekSchedule = '00 19 * * *'

exports.runSMSWeek = function () {
  schedule.scheduleJob(weekSchedule, function () {
    const week = moment().add(7, 'day')
    const year = week.year().toString()
    const month = (week.month() + 1).toString().padStart(2, '0')
    const day = week.date().toString().padStart(2, '0')
    const date = year + '-' + month + '-' + day

    Appointment.find({ date })
      .populate('client')
      .exec(function (err, appoints) {
        if (err) console.error(err)
        appoints.forEach(appoint => {
          turboSms.sendSmsClient(
            `${appoint.client.phone}`,
            `Dear ${appoint.client.first_name} ${appoint.client.last_name}, we remind you that next week, ${appoint.date}, at ${appoint.time} you have appointment.`
          )
        })
      })
  })
}
