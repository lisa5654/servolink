const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const User = require('../models/user');  

// Enable CORS for all routes
router.use(cors());

// Registration route
router.get('/register', async (req, res) => {
  console.log('GET request to /register received');
  res.send('Register route is working'); // Send a response for GET requests
});

// Login route
router.post('/login', async (req, res) => {
  // Handle user login logic here
});

// Other authentication-related routes...

module.exports = router;
