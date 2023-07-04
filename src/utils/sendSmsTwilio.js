const twilio = require("twilio")
const { configObje } = require("../config/config")
const { twilio_account_sid, twilio_auth_token, twilio_phone_number, my_phone_number} = configObje

const cliente = twilio(twilio_account_sid, twilio_auth_token, twilio_phone_number)

exports.sendSms = async (body)=>{
    await cliente.messages.create({
        body,
        from: twilio_phone_number,
        to: my_phone_number
    })
}