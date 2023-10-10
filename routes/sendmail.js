const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shantelmakwiranzou@gmail.com",
    pass: "fxtcvojsrhfvkkhw",
  },
});
router.post("/send-email", (req, res) => {
  const { name, service, date, email, time } = req.body;
  const mailOptions = {
    from: "shantelmakwiranzou@gmail.com",
    to: email,
    subject: "Contact Form Submission",
    html: `
        <h3>Contact Information:</h3>
        <p>Name: ${firstName} ${lastName}</p>
        <p>Phone: ${phone}</p>
        <p>Email: ${email}</p>
        <h3>Message:</h3>
        <p>${message}</p>
      `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
});

module.exports = router;
