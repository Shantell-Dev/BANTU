// routes/auth.routes.js

const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const router = express.Router();
const saltRounds = 10;

// POST  /auth/signup
// ...


// POST  /auth/login
// ...


// GET  /auth/verify
// ...

module.exports = router;
