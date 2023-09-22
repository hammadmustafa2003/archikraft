const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Define a route that responds with "Welcome to Archikraft Backend Server"
app.get('/', (req, res) => {
  res.send('Welcome to Archikraft Backend Server');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
