const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('../zomato/src/routes/routes');

const app = express();
const PORT = 3007;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use student routes
app.use('/api/students', studentRoutes);



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});