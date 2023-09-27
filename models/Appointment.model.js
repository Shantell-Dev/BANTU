const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const appointmentSchema = new Schema({
  date: String,
  employeeId: String,
  clientname: string,
  clientcontact: string,
  starttime: timeStamp,
  endtime: timeStamp,
  price: decimal(10,2),
  status: string,
});
 
module.exports = model('Appointment', appointmentSchema);