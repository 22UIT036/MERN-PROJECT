const express = require('express');
const auth = require('../middleware/authMiddleware'); // Authentication middleware
const Meal = require('../models/Meal'); // Meal model
const User = require('../models/User'); // User model

const router = express.Router();

// Add a new meal
router.post('/', auth, async (req, res) => {
  const { name, calories } = req.body;

  if (!name || !calories) {
    return res.status(400).json({ message: 'Meal name and calories are required.' });
  }

  try {
    const newMeal = new Meal({
      name,
      calories,
      user: req.user.id // Associate the meal with the logged-in user
    });

    const savedMeal = await newMeal.save();

    // Push the meal's ID to the user's meals array
    await User.findByIdAndUpdate(req.user.id, { $push: { meals: savedMeal._id } });

    res.status(201).json(savedMeal);
  } catch (error) {
    res.status(500).json({ message: 'Error saving meal. Please try again.' });
  }
});

module.exports = router;
