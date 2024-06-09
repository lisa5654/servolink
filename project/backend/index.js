const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT || 3001;

// Connection string from .env file
const uri = process.env.MONGODB_URI;

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

// API endpoint to get data by _id
app.get('/data/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // Connect to the database
    const database = client.db('Services'); // Replace with your database name
    const collection = database.collection('services'); // Replace with your collection name

    // Find the document by _id
    const document = await collection.findOne({ _id: new ObjectId(id) });

    if (document) {
      res.json(document);
    } else {
      res.status(404).send('Document not found');
    }
  } catch (err) {
    console.error('Error fetching document:', err);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server running at http://localhost:${port}`);
});
