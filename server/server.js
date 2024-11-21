// server.js
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes'); // Import your general routes
const userAccountRoutes = require('./routes/userAccount'); // Import user account routes
const parkingSpaceRoutes = require('../routes/parkingSpace'); // Import parking space routes

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/parking-management')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Use routes
app.use('/api', routes); // General routes
// app.use('/api/userAccount', userAccountRoutes); // User account routes
// app.use('/api/parkingSpace', parkingSpaceRoutes); // Parking space routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});