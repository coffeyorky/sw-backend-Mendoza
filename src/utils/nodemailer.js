const { createTransport } = require("nodemailer");
const { configObje } = require("../config/config");
const { dirname } = require("path");

const transport = createTransport({
  service: "gmail",
  port: "587",
  auth: {
    user: configObje.gmail_mail_user,
    pass: configObje.gmail_pass,
  }
});

exports.sendMailTransport = async () => {
   await transport.sendMail({
    from: `Coder test <${configObje.gmail_mail_user}>`,
    to: "rossitamb@gmail.com",
    subject: "Correo prueba",
    html: `
        <div>
        <h1>mensaje prueba</h1>
        </div>
        `,
    attachments: [
      {
        filename: "star.png",
        path: dirname(__dirname) + "/img/star.png",
        cid: "star",
      }
    ]
  });
};
