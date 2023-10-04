const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/Client.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


const router = express.Router();
const saltRounds = 10;

// POST  /auth/signup
router.post('/signup', async (req, res, next) => {
    try{
        const { email, password, name, role} = req.body;
        const existingUser = await User.findOne({ email })
    
        if (existingUser ){
            return res.status(400).json({ message: "User already exists" });
          }
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
          if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Provide a valid email address.' });  
          }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({name, email, password : hashedPassword, role});
    await newUser.save()
    res.status(201).json({message: "User registered"});
    } catch (error){
        console.log(error)
    }
});
// POST  /auth/login
router.post('/login', async (req, res, next) => {
    try{
        const { email, password} = req.body;
        const existingUser = await User.findOne({ email })
    
        if (!existingUser ){
            return res.status(404).json({ message: "User not found" });
          }
         
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid ){
        return res.status(401).json({ message: "Invalid password" });
      }
      const token = jwt.sign({ userId: existingUser._id }, 'mySecretKey', { expiresIn: '1h' });
      res.status(200).json({ token, userId: existingUser._id, role: existingUser.role });
   } catch (error){
        console.log(error)
    }
});

// GET  /auth/verify
router.get('/verify', isAuthenticated,
(req, res, next )=> {
    console.log('req.payload', req.payload);
    res.status(200).json(req.payload);
});

module.exports = router;
