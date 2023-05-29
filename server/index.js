const path = require('path');
const axios = require('axios');
const express = require("express");
const cors = require('cors');

const PORT = 3001; 

const app = express();

app.use(cors());

//Get the list of breed id and name for querying list
app.get('/breedsList', async (req, res) => {
  try {
      const response = await axios.get(`https://api.thecatapi.com/v1/breeds`);
      return res.json(response.data);
      
  } catch (error) {
      console.error(error);
      res.status(500).send('Error occurred while fetching cat data');
  }
});

//Get the data about a specific cat's image
// Test URL - http://localhost:3000/catImage?breedId=beng
// Response - [{"id":"H_UWbOfra","url":"https://cdn2.thecatapi.com/images/H_UWbOfra.jpg","width":1200,"height":1200}]
app.get('/catImage', async (req, res) => {
  try {
      const breedId = req.query.breedId
      const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
      res.json(response.data);
  } catch (error) {
      console.error(error);
      res.status(500).send('Error occurred while fetching cat data');
  }
});

// Get a collection of cat images given the breed
app.get('/catImages', async (req, res) => {
  try {
      const breedId = req.query.breedId
      const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}&api_key=${apiKey}`);
      res.json(response.data);
  } catch (error) {
      console.error(error);
      res.status(500).send('Error occurred while fetching cat data');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});