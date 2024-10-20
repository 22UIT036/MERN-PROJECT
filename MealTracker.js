import React, { useState } from "react";
import { Paper, Button, Typography, Box, Grid, List, ListItem, ListItemText, Avatar } from "@mui/material";
import "./MealTracker.css";

const MealTracker = () => {
  const [meal, setMeal] = useState({ name: "", calories: "", image: "" });
  const [mealLog, setMealLog] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0); // State to track total calories

  
  const dishCalories = {
    "Dosa": { calories: 168, image: "https://t4.ftcdn.net/jpg/01/89/45/21/360_F_189452136_gJBG4ZRXY9NnZZCGV2s8QhObmpeerJTO.jpg" },
    "Idli": { calories: 39, image: "https://media.istockphoto.com/id/638506124/photo/idli-with-coconut-chutney-and-sambhar.jpg?s=612x612&w=0&k=20&c=ze1ngBM0LY4w9aqWx_tGe2vTAr4uf36elveTDZ83fgw=" },
    "Biryani": { calories: 292, image: "https://png.pngtree.com/thumb_back/fh260/background/20240328/pngtree-mutton-biryani-meal-in-a-plate-on-table-image_15645442.jpg" },
    "Chapati": { calories: 68, image: "https://img.freepik.com/premium-photo/chapathi-with-vegetable-curry_931559-307.jpg" },
    "Puri": { calories: 101, image: "https://t4.ftcdn.net/jpg/06/09/85/57/360_F_609855746_Gb8wXFPiicMNoo4tbe5tT75SE3xz4AsR.jpg" },
    "Pongal": { calories: 226, image: "https://www.spiceindiaonline.com/wp-content/uploads/2014/01/Ven-Pongal-3.jpg" },
    "Samosa": { calories: 262, image: "https://images.pexels.com/photos/14477873/pexels-photo-14477873.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    "Rajma Chawal": { calories: 378, image: "https://mypeppermintkitchen.wordpress.com/wp-content/uploads/2020/12/rajma-chawal-cover.jpg?w=1568" },
  };

  // Handle dish selection when an image is clicked
  const handleDishClick = (dish) => {
    const { calories, image } = dishCalories[dish];
    setMeal({ name: dish, calories, image });
  };

  const handleAddMeal = () => {
    if (meal.name && meal.calories) {
      setMealLog([...mealLog, meal]);
      setTotalCalories(totalCalories + meal.calories); // Update total calories
      setMeal({ name: "", calories: "", image: "" });
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Meal Tracker
      </Typography>

      {/* Grid of dish images */}
      <Grid container spacing={2}>
        {Object.keys(dishCalories).map((dish, index) => (
          <Grid item xs={6} sm={4} md={3} key={index} onClick={() => handleDishClick(dish)}>
            <Paper elevation={3} className="dish-image-container">
              <Avatar
                alt={dish}
                src={dishCalories[dish].image}
                sx={{ width: 100, height: 100, margin: "auto", cursor: "pointer" }}
              />
              <Typography variant="body1" align="center">{dish}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Selected meal details and action button */}
      {meal.name && (
        <Paper elevation={3} sx={{ padding: 2, marginTop: 3 }}>
          <Typography variant="h6">Selected Meal: {meal.name}</Typography>
          <Typography variant="body1">Calories: {meal.calories} kcal</Typography>
          <Button variant="contained" color="primary" onClick={handleAddMeal} sx={{ mt: 2 }}>
            Add Meal
          </Button>
        </Paper>
      )}

      {/* Meal log and total calories display */}
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Today's Meals</Typography>
            <List>
              {mealLog.map((item, index) => (
                <ListItem key={index}>
                  <Avatar alt={item.name} src={item.image} sx={{ marginRight: 2 }} />
                  <ListItemText primary={item.name} secondary={`${item.calories} kcal`} />
                </ListItem>
              ))}
            </List>
            {/* Display total calories */}
            <Typography variant="h6" align="right" sx={{ marginTop: 2 }}>
              Total Calories: {totalCalories} kcal
            </Typography>
            </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MealTracker;

