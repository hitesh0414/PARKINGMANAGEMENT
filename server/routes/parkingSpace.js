// routes/parkingSpace.js
const express = require('express');
const ParkingSpace = require('../models/ParkingSpace');
const router = express.Router();

// Create a new parking space
router.post('/add', async (req, res) => {
  try {
    const { spaceNumber, location, pricePerHour } = req.body;

    const newParkingSpace = new ParkingSpace({
      spaceNumber,
      location,
      pricePerHour,
      status: 'available',
    });

    await newParkingSpace.save();
    res.status(201).json({ message: 'Parking space added successfully', parkingSpace: newParkingSpace });
  } catch (err) {
    res.status(400).json({ message: 'Failed to add parking space', error: err });
  }
});

// Fetch all parking spaces
router.get('/', async (req, res) => {
  try {
    const parkingSpaces = await ParkingSpace.find();
    res.status(200).json(parkingSpaces);
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch parking spaces', error: err });
  }
});

// Update parking space status (e.g., occupy or free)
router.put('/update/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const parkingSpace = await ParkingSpace.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!parkingSpace) {
      return res.status(404).json({ message: 'Parking space not found' });
    }

    res.status(200).json({ message: 'Parking space status updated', parkingSpace });
  } catch (err) {
    res.status(400).json({ message: 'Failed to update parking space', error: err });
  }
});

// Fetch a specific parking space by its ID
router.get('/:id', async (req, res) => {
  try {
    const parkingSpace = await ParkingSpace.findById(req.params.id);

    if (!parkingSpace) {
      return res.status(404).json({ message: 'Parking space not found' });
    }

    res.status(200).json(parkingSpace);
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch parking space', error: err });
  }
});

module.exports = router;