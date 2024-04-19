const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from 'public'
app.use('/cdn', express.static('public'));

// Set up classRoutes
const classRoutes = require('./classRoutes');
app.use('/class', classRoutes);

// Serve index.html at '/class'
app.get('/class', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
