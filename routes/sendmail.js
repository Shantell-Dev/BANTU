const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shantelmakwiranzou@gmail.com",
    pass: "fxtcvojsrhfvkkhw",
  },
});
app.post("/send-email", (req, res) => {
  const { firstName, lastName, phone, email, message } = req.body;
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
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});
