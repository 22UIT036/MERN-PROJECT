// src/components/WorkoutLogger.js
import React, { useState } from "react";
import { Paper, TextField, Button, Typography, Box, Grid, List, ListItem, ListItemText, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const WorkoutLogger = () => {
  const [workout, setWorkout] = useState({ type: "", duration: "", caloriesBurned: "" });
  const [workoutLog, setWorkoutLog] = useState([]);

  // Calorie rates for different workout types
  const calorieRates = {
    running: 10,  
    cycling: 8,   
    walking: 4,   
    swimming: 12,  
    jumprope: 11,  
    zumba: 9,  
    "strength training": 6,  
    dancing: 7,  
    cardio: 8 
  };

  // Calculate calories burned based on workout type and duration
  const calculateCalories = (type, duration) => {
    const rate = calorieRates[type.toLowerCase()] || 5; // Default to 5 kcal/min if workout type not found
    return duration * rate;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "duration" && workout.type) {
      const caloriesBurned = calculateCalories(workout.type, value);
      setWorkout({ ...workout, [name]: value, caloriesBurned: caloriesBurned });
    } else {
      setWorkout({ ...workout, [name]: value });
    }
  };

  // Handle workout type selection from dropdown
  const handleWorkoutTypeChange = (e) => {
    const selectedType = e.target.value;
    setWorkout({ ...workout, type: selectedType });
  };

  // Add the workout to the workout log
  const handleAddWorkout = () => {
    if (workout.type && workout.duration && workout.caloriesBurned) {
      setWorkoutLog([...workoutLog, workout]);
      setWorkout({ type: "", duration: "", caloriesBurned: "" });
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 2,
        backgroundImage: 'url("https://images.squarespace-cdn.com/content/v1/6172df1c788fd5110bf1989b/40c74f9d-a98b-4293-a763-c376f5eb7bef/About.png")', // Use your image URL here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Workout Logger
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Log a Workout</Typography>
            
            {/* Workout Type Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Workout Type</InputLabel>
              <Select
                label="Workout Type"
                value={workout.type}
                onChange={handleWorkoutTypeChange}
              >
                <MenuItem value="running">Running</MenuItem>
                <MenuItem value="cycling">Cycling</MenuItem>
                <MenuItem value="walking">Walking</MenuItem>
                <MenuItem value="swimming">Swimming</MenuItem>
                <MenuItem value="jumprope">Jumprope</MenuItem>
                <MenuItem value="zumba">Zumba</MenuItem>
                <MenuItem value="strength training">Strength Training</MenuItem>
                <MenuItem value="dancing">Dancing</MenuItem>
                <MenuItem value="cardio">Cardio</MenuItem>
              </Select>
            </FormControl>

            {/* Duration Input */}
            <TextField
              fullWidth
              margin="normal"
              label="Duration (minutes)"
              name="duration"
              type="number"
              value={workout.duration}
              onChange={handleInputChange}
            />

            {/* Calculated Calories Burned */}
            <TextField
              fullWidth
              margin="normal"
              label="Calories Burned"
              name="caloriesBurned"
              value={workout.caloriesBurned}
              disabled
            />

            <Button variant="contained" color="primary" onClick={handleAddWorkout} sx={{ mt: 2 }}>
              Add Workout
            </Button>
          </Paper>
        </Grid>

        {/* Display Workout Log */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Today's Workouts</Typography>
            <List>
              {workoutLog.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item.type} secondary={`${item.duration} min, ${item.caloriesBurned} kcal`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkoutLogger;
