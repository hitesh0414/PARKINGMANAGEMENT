const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assume you have a User model for MongoDB

// Signin function
const signin = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found.' });
  }

  // Compare the hashed password with the entered password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials.' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', {
    expiresIn: '1h' // Token expiry time
  });

  res.status(200).json({
    message: 'Login successful!',
    token
  });
};

module.exports = signin;