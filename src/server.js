const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const connectDB = require('./services/mongodb'); 


require('dotenv').config();

app.use(express.json());


connectDB();


app.get('/', (req, res) => {
  res.send('Noise Map Backend is running!');
});

// Example POST route for receiving data
app.post('/collect-noise-data', (req, res) => {
  try {
    const noiseData = req.body;
    console.log(noiseData); // Process and store this data as needed
    res.status(200).send('Data received');
  } catch (error) {
    res.status(500).send('Error processing data');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

