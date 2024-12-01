const express = require('express');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Security Middleware for image access
app.get('/cdn-image', (req, res) => {
    const referer = req.headers.referer || '';
    const allowedDomain = process.env.ALLOWED_DOMAIN || 'https://gen-jut-su.com/solantis/';

    if (referer.startsWith(allowedDomain)) {
        res.sendFile(path.join(__dirname, 'public/images/Nation-Union-Finale ZMV3.png'));
    } else {
        res.status(403).send('You are not authorized to access this resource.');
    }
});

// Render frontend page
app.get('/', (req, res) => {
    res.render('index', { imageUrl: `${req.protocol}://${req.get('host')}/cdn-image` });
});

// Start server
app.listen(PORT, () => console.log(`CDN running on port ${PORT}`));
