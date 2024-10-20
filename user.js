// routes/user.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model
const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
  if (!token) return res.status(403).send("A token is required for authentication");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// GET /api/user/dashboard
router.get('/Dashboard', verifyToken, async (req, res) => {
  try {
    // Fetch user's fitness data
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Sample response, you should adapt this to fit your data structure
    res.status(200).json({
      success: true,
      stepsData: [ /* your steps data here */ ],
      calories: user.calories || 0,
      workoutTime: user.workoutTime || 0,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
