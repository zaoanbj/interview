const http = require('http');
const fs = require('fs');
const server = http.createServer();
server
    .on('request', function (request, response) {
        console.log(request.url);
        if (request.url == '/') {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Content-Type', 'text/html;charset=utf-8');
            fs.readFile('./index.html', 'utf8', function (error, data) {
                if (error) {
                    console.log(error);
                }
                response.end(data);
            })
        } else if (request.url == '/post') {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.end('ok')
        } else {
            fs.readFile('.' + request.url, function (error, data) {
                response.end(data)
            })
        }
    })
    .listen(3000, function () {
        console.log('3000, ok');
    })