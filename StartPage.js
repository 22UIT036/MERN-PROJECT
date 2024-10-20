import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const StartPage = () => {
  const navigate = useNavigate(); // Create a navigate function

  const handleGetStarted = () => {
    navigate('/signup'); // Navigate to the login page on button click
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYL5h0cBgQlarlwQdmp8UwgFo2rkUFH245JA&s')`, 
        backgroundSize: "cover",  
        backgroundPosition: "center", 
      }}
    >
      <Typography variant="h2" color="primary" gutterBottom>
        Welcome to FitPro!
      </Typography>
      <Typography variant="h5" color="primary" gutterBottom>
        Track your fitness journey with us.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGetStarted} sx={{ marginTop: 2 }}>
        Get Started
      </Button>
    </Box>
  );
};

export default StartPage;

