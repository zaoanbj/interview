const express = require('express');
const app = express();

app.get('/home', function (request, response) {
    response.sendfile(__dirname + '/index.html');
})

app.get('/data', function (request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send('ok');
})

app.listen(9000, function () {
    console.log(9000)
})