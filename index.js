const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle date requests
app.get('/api/:date?', (req, res) => {
  let inputDate = req.params.date;
  
  // If no date is provided, use current time
  if (!inputDate) {
    inputDate = new Date();
  } else {
    // Parse the input date
    inputDate = new Date(inputDate);
    
    // Check if the date is invalid
    if (isNaN(inputDate.getTime())) {
      return res.json({ error: "Invalid Date" });
    }
  }
  
  // Format the response
  res.json({
    unix: inputDate.getTime(), // Unix timestamp in milliseconds
    utc: inputDate.toUTCString() // UTC string format
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
