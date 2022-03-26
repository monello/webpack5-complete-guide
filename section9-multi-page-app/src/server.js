const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use('/static', express.static(path.resolve(__dirname, '../dist')));

app.get('/hello-world/', function (req, res) {
    // find the index.html to serve
    const pathToHtmlFile = path.resolve(__dirname, '../dist/hello-world.html');
    // read the contents of the file. It returns a JS string into a variable. Read is done Asynchronously
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
    // sent the content to the browser
    res.send(contentFromHtmlFile);
});

app.get('/kiwi/', function (req, res) {
    // find the index.html to serve
    const pathToHtmlFile = path.resolve(__dirname, '../dist/kiwi.html');
    // read the contents of the file. It returns a JS string into a variable. Read is done Asynchronously
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
    // sent the content to the browser
    res.send(contentFromHtmlFile);
});

app.listen(3000, function () {
    console.log('Application is running on http://localhost:3000/');
});
