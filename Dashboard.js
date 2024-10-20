// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, CircularProgress, Button, IconButton } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from 'react-router-dom';

// Sample data for charts
const initialData = [
  { day: "Mon", steps: 5000 },
  { day: "Tue", steps: 7500 },
  { day: "Wed", steps: 6000 },
  { day: "Thu", steps: 8000 },
  { day: "Fri", steps: 9000 },
  { day: "Sat", steps: 10000 },
  { day: "Sun", steps: 11000 },
];

const Dashboard = () => {
  const [data, setData] = useState(initialData);
  const [calories, setCalories] = useState(600);
  const [workoutTime, setWorkoutTime] = useState(30);
  const [status, setStatus] = useState(""); // State to manage user status
  const [statusLog, setStatusLog] = useState([]); // State to manage status log
  const navigate = useNavigate();

  // Simulate real-time updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCalories(prev => prev + Math.floor(Math.random() * 100));
      setWorkoutTime(prev => prev + Math.floor(Math.random() * 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Function to refresh the chart data
  const refreshData = () => {
    const newData = data.map(item => ({
      day: item.day,
      steps: Math.floor(Math.random() * 12000), // Random steps between 0-12000
    }));
    setData(newData);
  };

  // Handle status update
  const handleStatusUpdate = () => {
    if (status.trim()) {
      setStatusLog([...statusLog, status]);
      setStatus(""); // Clear the input after updating
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 2,
        backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbMU_-W5j8_EwhEOvA8OAAbaZV1tydeHl94Q&s")', // Direct URL for the background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {/* Steps Progress */}
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Steps</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 150, position: "relative" }}>
              <CircularProgress variant="determinate" value={(data[data.length - 1].steps / 12000) * 100} size={100} thickness={4} />
              <Box sx={{ position: "absolute" }}>
                <Typography variant="h6" component="div">{data[data.length - 1].steps}</Typography>
                <Typography variant="body2">of 12,000</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        

        {/* Calories Burned */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Calories Burned</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 150, position: "relative" }}>
              <CircularProgress variant="determinate" value={(calories / 1000) * 100} size={100} thickness={4} />
              <Box sx={{ position: "absolute" }}>
                <Typography variant="h6" component="div">{calories}</Typography>
                <Typography variant="body2">of 1,000</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Workout Time */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Workout Time</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 150, position: "relative" }}>
              <CircularProgress variant="determinate" value={(workoutTime / 60) * 100} size={100} thickness={4} />
              <Box sx={{ position: "absolute" }}>
                <Typography variant="h6" component="div">{workoutTime} min</Typography>
                <Typography variant="body2">of 60 min</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Steps Line Chart */}
        <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={3} sx={{ padding: 2, width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Steps Progress
              <IconButton onClick={refreshData} sx={{ float: 'right' }}>
                <RefreshIcon />
              </IconButton>
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="steps" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        {/* Button to navigate to Workout Logger */}
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate('/workout-logger')}
          >
            Go to Workout Logger
          </Button>
        </Grid>

        {/* Button to navigate to Meal Tracker */}
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate('/meal-tracker')}
          >
            Go to Meal Tracker
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
