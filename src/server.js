const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./services/mongodb');
const socketService = require('./services/socketService');
const User = require('../models/UserModel');

const app = express();
const server = http.createServer(app);

require('dotenv').config();
app.use(express.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => {
  res.send('Noise Map Backend is running!');
});

app.post('/collect-noise-data', async (req, res) => {
  try {
    const noiseData = req.body['noise'];
    const longitude = req.body['long'];
    const latitude = req.body['lat'];

    let timestamp;
    if(req.body.hasOwnProperty('timestamp')){
      timestamp = new Date(req.body['timestamp']);
    } else {
      timestamp = Date.now();
    }
    
    const userStore = await User.create({ long:longitude, lat:latitude, noise: noiseData, timestamp: timestamp });
    console.log("received:",{ long:longitude, lat:latitude, noise: noiseData, timestamp: timestamp })

    // Broadcast noise data to connected clients
    const io = socketService.getIO();
    io.emit('newNoiseData', { longitude, latitude, noiseData, timestamp });

    
    res.status(200).send('Data received');

  } catch (error) {
    console.log(error);
    res.status(500).send('Error processing data');
  }
});

app.get("/get-sounds", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  socketService.init(server);
});
