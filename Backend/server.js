const express = require('express');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Welcome to Archikraft Backend Server');
});

app.get('/saadapi', async (req, res) => {
  try {
    const apiUrl = 'https://d82a-103-77-11-146.ngrok-free.app/';
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
