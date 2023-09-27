const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const appointmentSchema = new Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["scheduled", "completed", "canceled"],
    default: "scheduled",
  },
  from: { type: String, required: true },
  to: { type: String, required: true },
});

module.exports = model("Appointment", appointmentSchema);
