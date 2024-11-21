// models/ParkingSpace.js
const mongoose = require('mongoose');

const parkingSpaceSchema = new mongoose.Schema({
  spaceNumber: {
    type: Number,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'occupied'],
    default: 'available'
  },
  pricePerHour: {
    type: Number,
    required: true
  }
});

const ParkingSpace = mongoose.model('ParkingSpace', parkingSpaceSchema);

module.exports = ParkingSpace;