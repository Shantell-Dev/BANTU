const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  servicename: { type: String, unique: true, required: true },
  duration: { type: String, required: true },
  price: decimal(10,2)
});

module.exports = model("Service", serviceSchema);