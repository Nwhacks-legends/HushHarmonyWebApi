const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// In-memory data store
const noiseDataStore = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// add cors
const cors = require('cors');
app.use(cors());

// POST route to collect noise data
app.post('/collect-noise-data', (req, res) => {
  try {
    const { noise, long, lat } = req.body;
    noiseDataStore.push({ long, lat, noise });
    console.log('Data stored in memory:', { long, lat, noise });
    res.status(200).send('Data received and stored in memory');
  } catch (error) {
    console.error('Error in /collect-noise-data:', error);
    res.status(500).send('Error processing data');
  }
});

// Optional GET route to retrieve stored data
app.get('/get-noise-data', (req, res) => {
  res.status(200).json(noiseDataStore);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
