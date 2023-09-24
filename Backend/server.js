const express = require('express');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 5000;

// cors
const cors = require('cors');
app.use(express.json());
app.use(cors());


// Define a route that responds with "Welcome to Archikraft Backend Server"
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

app.post('/signup', async (req, res) => {
  try {
    const { email, password, username, name, confirmPassword, role, country, phoneNumber } = req.body;
    console.log('Received Signup Data:');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Username:', username);
    console.log('Name:', name);
    console.log('Confirm Password:', confirmPassword);
    console.log('Role:', role);
    console.log('Country:', country);
    console.log('Phone Number:', phoneNumber);
    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred during signup inzamam' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
