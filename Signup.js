import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, CircularProgress, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // State to show success messages after signup
  const navigate = useNavigate();

  // Handle Signup and Login
  const handleAuth = async () => {
    if (username && password) {
      setLoading(true);
      setError("");
      setSuccess("");
      try {
        const url = isLogin
          ? 'http://localhost:5000/api/auth/login' // Login URL
          : 'http://localhost:5000/api/auth/signup'; // Signup URL

        const response = await axios.post(url, { username, password });

        if (response.data.success) {
          if (isLogin) {
            // Login Success - Redirect to Dashboard
            alert(`Login successful! Welcome back, ${username}.`);
            navigate("/Dashboard"); // Redirect to dashboard after successful login
          } else {
            // Signup Success - Show message but do not redirect yet
            setSuccess(`Signup successful! Welcome, ${username}. Please log in.`);
          }
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message || (isLogin ? 'Login failed.' : 'Signup failed.'));
        } else if (error.request) {
          setError('No response from server. Please check your connection.');
        } else {
          setError('Error: ' + error.message);
        }
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please enter both username and password.');
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: "url('https://wallpapers.com/images/featured/blue-abstract-bsid6neh0qavpfd1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper sx={{ padding: 4, width: 300, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <Typography variant="h4" gutterBottom>
          {isLogin ? "Login" : "Sign Up"}
        </Typography>

        {/* Toggle between Login and Signup */}
        <ToggleButtonGroup
          value={isLogin ? "login" : "signup"}
          exclusive
          onChange={(event, newAlignment) => setIsLogin(newAlignment === "login")}
          sx={{ marginBottom: 2 }}
        >
          <ToggleButton value="login">Login</ToggleButton>
          <ToggleButton value="signup">Sign Up</ToggleButton>
        </ToggleButtonGroup>

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>} {/* Success message after signup */}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleAuth}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : isLogin ? "Login" : "Sign Up"}
        </Button>
      </Paper>
    </Box>
  );
};

export default AuthPage;
