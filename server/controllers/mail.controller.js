import nodemailer from "nodemailer";

export const Mail = async (email, OTP) => {
  // open two step verification and add an (app password)"
  const nodeConfig = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  };

  const mailOptions = {
    from: "password recovery", // sender address
    to: email, // list of receivers
    subject: "Reset Password OTP", // Subject line
    html: `<div>You reset password OTP is  <h2>${OTP}</h2></div>`, // html body
  };

  let transporter = nodemailer.createTransport(nodeConfig);
  await transporter.sendMail(mailOptions);
};
