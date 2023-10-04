const router = require("express").Router();
const nodemailer = require("nodemailer");
const Order = require("../../models/Order.model");
const User = require("../../models/User.model");

router.get("/orderPage", (req, res) => {
  res.render("formViews/orderPage");
});
//CurrentUser
router.post("/some", (req, res) => {
  if (!req.session.currentUser) {
    return res.render("formViews/orderPage", {
      errorMessage: "You are not Signed In. Please Sign In or register to place an order.",
    });
  }
  const newOrder = new Order({
    user:req.session.currentUser._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    detail: req.body.detail,
    address: req.body.address,
    city: req.body.city,
    region: req.body.region,
    postal: req.body.postal,
    country: req.body.country,
    select: req.body.select,
});
newOrder.save()
    .then((order) => {
      console.log('Order saved:', order);
        return User.findByIdAndUpdate(req.session.currentUser._id, {
            $push: { order: order._id },
        });
    })
    .then(() => {
        const detail = `
        <p>You have a new Order</p>
        <h3>Details:</h3>
        <ul>
        <li> firstName :${req.body.firstName}</li>
        <li>  lastName:${req.body.lastName}</li>
        <li>  email:${req.body.email}</li>
        <li> phone :${req.body.phone}</li>
        <li>  detail:${req.body.detail}</li>
        <li>  address:${req.body.address}</li>
        <li>  city:${req.body.city}</li>
        <li>  region:${req.body.region}</li>
        <li> postal :${req.body.postal}</li>
        <li>  country:${req.body.country}</li>
        <li>  select:${req.body.select}</li>
        </ul>
        `;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mahtabvariyani@gmail.com",
      pass: "gbxchdoisuzijxgl",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: req.body.email,
    to: "mahtabvariyani@gmail.com",
    subject: `Message from ${req.body.firstName}: ${req.body.lastName}`,
    text: req.body.text,
    html: detail,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    console.error("Email sending error:", error);
    if (error) {
      return console.log(error);
    } else {
      console.log("Email sent:", info.response);
      res.render("formViews/orderPage", { msg: "You sent an Order,we will Contact You Shortly" });
    }
  });
    })
    .catch((error) => {
      console.error('Error saving order:', error);
        console.error(error);
    });
});
module.exports = router;