const { isAuthenticated } = require("../middleware/jwt.middleware");
const nodemailer = require("nodemailer");
const router = require("express").Router();

router.get("/appointment", isAuthenticated, async (req, res) => {
  const { name, email, date, time, service } = req.body;
  const decodedEmail = req.decoded.email;

  if (email !== decodedEmail) {
    return res.status(403).send({ message: "forbidden access" });
  }

  const query = { email: email };
  const appointment = await appointmentCollection.find(query).toArray();
  res.send(appointment);
});
router.post("/appointment", async (req, res) => {
  const { name, email, date, time, service } = req.body;
  const appointment = req.body;
  console.log(appointment);

  const appointmentData = {
    client: name,
    email,
    date,
    from: time,
    to: email,
    service: service,
    status: "scheduled",
  };
  try {
    const appointment = await appointment.create(appointmentData);
    res.json({ success: true, appointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create appointment" });
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shantelmakwiranzou@gmail.com",
      pass: "fxtcvojsrhfvkkhw",
    },
  });
  const alreadyBooked = await appointmentCollection.find(query).toArray();

  if (alreadyBooked.length) {
    const message = `You already have an appointment on ${booking.appointmentDate}`;
    return res.send({ acknowledged: false, message });
  }
  const result = await appointmentCollection.insertOne(appointment);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
  res.send(result);
});

module.exports = router;
