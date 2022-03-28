const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Define how we will server static files
app.use('/', express.static(path.resolve(__dirname, '../dist')));

// Tell Express to serve the same HTML file for ANY "*" URL
app.get('*', function (req, res) {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/dashboard.html');
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
    res.send(contentFromHtmlFile);
});

app.listen(9000, function () {
    console.log('Application is running on http://localhost:9000');
});
