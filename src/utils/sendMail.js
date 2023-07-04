const { createTransport } = require("nodemailer")
const { configObje } = require("../config/config")
const { gmail_pass, gmail_mail_user } = configObje

const transport = createTransport({
    service: "gmail",
    port: 578,
    auth: {
        user: gmail_mail_user,
        pass: gmail_pass
    }
})

let from = `email de prueba <${gmail_mail_user}>`

const sendMail = async ({userMail, subject, html}) => {
    return await transport.sendMail({
        from,
        to: userMail,
        subject,
        html
    })
}

module.exports = {
    sendMail
}