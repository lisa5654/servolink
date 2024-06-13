// Require necessary modules
const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;


app.use(express.json()); 
app.use(cors()); 


const uri = process.env.MONGODB_URI;


const client = new MongoClient(uri);


async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

// const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);
app.use(bodyParser.json());
// Route handler to handle registration

// app.post('/register', (req, res) => {
//   // Extract data from the request body
//   const { email, username, password, confirmPassword } = req.body;

//   // Perform validation and registration logic here
//   // For demonstration, simply log the received data
//   console.log('Received data:', { email, username, password, confirmPassword });

//   // Respond to the client
//   res.status(200).json({ message: 'Registration successful' });
// });


// Route handler to handle registration
// Route handler to handle registration
app.post('/register', async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Connect to MongoDB
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db(); // Get the database instance
    const usersCollection = db.collection('Users'); // Adjust collection name to "Users"

    // Check if the user already exists in the database
    const existingUser = await usersCollection.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this username already exists' });
    }

    // Insert the user data into the "Users" collection
    const result = await usersCollection.insertOne({ email, username, password });
    console.log('Inserted user:', result.insertedId);

    // Respond to the client with a success message
    res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  } finally {
    // Close the MongoDB connection
    await client.close();
    console.log('MongoDB connection closed');
  }
});


app.post('/login', async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Connect to MongoDB
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db(); // Get the database instance
    const usersCollection = db.collection('Users'); // Adjust collection name to match your database

    // Check if the provided username and password exist in the database
    const user = await usersCollection.findOne({ username, password });

    if (user) {
      // If user exists, send a success response with user data
      res.status(200).json({ message: 'Login successful', user });
    } else {
      // If user does not exist, send an error response
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error occurred while processing login request:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Close the MongoDB connection
    await client.close();
    console.log('MongoDB connection closed');
  }
});


app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server running at http://localhost:${port}`);
});