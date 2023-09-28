const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = require("express").Router();
 

router.get('/appointments', isAuthenticated, async (req, res) => {
    const email = req.query.email;
    const decodedEmail = req.decoded.email;

    if (email !== decodedEmail) {
        return res.status(403).send({ message: 'forbidden access' });
    }

    const query = { email: email };
    const appointments = await appointmentsCollection.find(query).toArray();
    res.send(appointments);
})
router.get('/appointmentlist', async(req, res) => {
    const query={};
   const options= await appointmentsListCollection.find(query).toArray();
   res.send(options)
 }) 
  router.post('/appointments', async(req, res) => {
     
   const appointment =req.body;
   console.log(appointment);

   const query = {
     appointmentDate: booking.appointmentDate,
     email: booking.email,
     service: booking.service
 }

 const alreadyBooked = await appointmentsCollection.find(query).toArray();

 if (alreadyBooked.length) {
     const message = `You already have an appointment on ${booking.appointmentDate}`
     return res.send({ acknowledged: false, message })
 }
 const result= await appointmentsCollection.insertOne(appointment);
 res.send(result);
});

module.exports = router;