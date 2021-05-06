const soap = require('soap')
const Cookie = require('soap-cookie')

const url = 'http://turbosms.in.ua/api/wsdl.html'
const sender = 'Msg'
const authData = { login: process.env.TURBO_SMS_LOGIN, password: process.env.TURBO_SMS_PASSWORD }

let smsClient = null

// TODO: check init runs once
const init = (async function () {
  if (smsClient) return
  let client = await soap.createClientAsync(url)
  await client.AuthAsync(authData)
  client.setSecurity(new Cookie(client.lastResponseHeaders))
  smsClient = client
})()

exports.sendSmsClient = async function (phone, text) {
  await init
  await smsClient.SendSMS(
    {
      sender,
      destination: phone,
      text
    },
    function (err, result) {
      if (err) console.error(err)
      console.log(`Message sent - ${phone} - ${text}`)
    }
  )
}
