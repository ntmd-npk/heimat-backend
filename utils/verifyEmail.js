const nodemailer = require("nodemailer");
const template = require("../template");
function verifyEmail(email) {
  return new Promise((resolve, reject) => {
    try {
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: true,
        service: "gmail.com",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      const code = 305257; //parseInt(Math.random() * 999999);
      var mailOption = {
        from: process.env.EMAIL,
        to: email,
        subject: "Verify your account",
        text: "Code register",
        html: template(code, email),
      };
      transporter.sendMail(mailOption, function (err) {
        if (err) {
          console.log(err);
          reject({
            status: false,
            code,
          });
        } else {
          resolve({
            status: true,
            code,
          });
        }
      });
    } catch {
      reject({
        status: false,
        code,
      });
    }
  });
}

module.exports = verifyEmail;
