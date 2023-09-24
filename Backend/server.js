const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// cors
const cors = require('cors');
app.use(cors());


// Define a route that responds with "Welcome to Archikraft Backend Server"
app.get('/', (req, res) => {
  res.send('Welcome to Archikraft Backend Server');
});

// POST route for /login
app.post('/login', (req, res) => {
  console.log(req.body);


});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
