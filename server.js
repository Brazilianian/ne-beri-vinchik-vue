// server.js
let express = require('express');
let path = require('path');
let serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));
let port = process.env.PORT || 5000;
let hostname = '127.0.0.1';

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});