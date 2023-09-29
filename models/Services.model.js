const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const serviceSchema = new Schema({
  serviceName: { type: String, unique: true, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

module.exports = model("Service", serviceSchema);
