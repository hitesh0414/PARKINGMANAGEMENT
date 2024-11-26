const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleNo: { type: String, required: true },
  license: { type: String, required: true },
  route: { type: String, required: true },
  tripDetails: [{ date: Date, passengers: Number }],
});

module.exports = mongoose.model('Vehicle', vehicleSchema);