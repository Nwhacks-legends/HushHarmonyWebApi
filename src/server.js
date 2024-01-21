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
app.post('/collect-noise-data', async (req, res) => {
  try {
    const noiseData = req.body['noise'];
    const long = req.body['long'];
    const lat = req.body['lat'];
    console.log(noiseData);
    const userStore = await User.create({ long, lat, noise: noiseData });
    res.status(200).send('Data received');

  } catch (error) {
    res.status(500).send('Error processing data');
  }
});

//GET user coordinates
app.get("/get-sounds", async(req,res) => {
  try{
    const users = await User.find({})
    res.send(200).json(users)

  }
  catch(error){
    res.status(500).json({message: error.message})

  }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

