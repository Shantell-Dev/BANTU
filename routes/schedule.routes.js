const router = require ("express").Router();
const Bookings = require("../models/Booking.model");

router.post("/bookings",(req, res, next)=> {
    const { name, title } = req.body;
    
})