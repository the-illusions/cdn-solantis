const express = require('express');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set the views directory
app.set('views', path.join(__dirname, 'views')); // Make sure this path is correct

// Middleware
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Render frontend page
app.get('/', (req, res) => {
  const imageUrl = `${req.protocol}://${req.get('host')}/cdn-image.png`; // Add .png here
  res.render('index', { imageUrl });
});

// Security Middleware for image access
app.get('/cdn-image.png', (req, res) => { // Updated route to handle .png
  const referer = req.headers.referer || '';
  const allowedDomain = process.env.ALLOWED_DOMAIN;

  if (referer.startsWith(allowedDomain)) {
    res.sendFile(path.join(__dirname, 'public/images/Nation-Union-Finale ZMV3.png')); // Update to actual image path
  } else {
    res.status(403).send('You are not authorized to access this resource.');
  }
});

// Start server
app.listen(PORT, () => console.log(`CDN running on port ${PORT}`));
