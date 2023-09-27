// models/Project.model.js

const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const scheduleSchema = new Schema({
  employee_id: String,
  from: timeStamp,
  to: timeStamp
  // owner will be added later on
});

module.exports = model('Schedule', scheduleSchema);
