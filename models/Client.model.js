// models/User.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const clientSchema = new Schema({
  name: { type: String, unique: true, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = model("Client", clientSchema);
