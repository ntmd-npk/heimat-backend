const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  service: "gmail",
  auth: {
    user: "manager.heimat@gmail.com", // <= smtp login user
    pass: "manager.heimat13", // <= smtp login pass
  },
});
var mailOption = {
  from: "manager.heimat@gmail.com",
  to: "d.nhat.it@gmail.com",
  subject: "Verify your account",
  text: "test",
  html: "<b> code <b>",
};
transporter.sendMail(mailOption, function (err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log(info.response);
  }
});
