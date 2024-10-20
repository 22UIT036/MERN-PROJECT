const express = require('express');
const auth = require('../middleware/authMiddleware');
const Workout = require('../models/Workout');
const User = require('../models/User');

const router = express.Router();

// Add a new workout
router.post('/', auth, async (req, res) => {
  const { type, duration, calories } = req.body;

  if (!type || !duration || !calories) {
    return res.status(400).json({ message: 'Workout type, duration, and calories are required.' });
  }

  try {
    const newWorkout = new Workout({
      type,
      duration,
      calories,
      user: req.user.id // Associate the workout with the logged-in user
    });

    const savedWorkout = await newWorkout.save();

    // Push the workout's ID to the user's workouts array
    await User.findByIdAndUpdate(req.user.id, { $push: { workouts: savedWorkout._id } });

    res.status(201).json(savedWorkout);
  } catch (error) {
    res.status(500).json({ message: 'Error saving workout. Please try again.' });
  }
});

module.exports = router;
