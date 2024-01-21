const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const connectDB = require('./services/mongodb'); 
const User = require('../models/UserModel'); 



require('dotenv').config();

app.use(express.json());

const cors = require('cors');
app.use(cors());


connectDB();


app.get('/', (req, res) => {
  res.send('Noise Map Backend is running!');
});

// Example POST route for receiving data
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
    res.status(200).send('Data received');

  } catch (error) {
    res.status(500).send('Error processing data');
  }
});

//GET user coordinates
app.get("/get-sounds", async(req,res) => {
  try{
    const users = await User.find({})
    res.status(200).json(users)

  }
  catch(error){
    res.status(500).json({message: error.message})

  }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

