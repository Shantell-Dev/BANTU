const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const employeesSchema = new Schema({
  firstname: { type: String, unique: true, required: true },
  lastname: { type: String, required: true },
});

module.exports = model("Employees", employeesSchema);