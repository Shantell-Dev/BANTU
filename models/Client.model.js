// models/User.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const clientSchema = new Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, enum: ["client", "staff"], default: "client" },
});

module.exports = model("Client", clientSchema);
