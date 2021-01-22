const http = require('http');
const fs = require('fs');
const server = http.createServer();

server.on('request', function (request, response) {
    // console.log('ok', request.socket.remoteAddress, request.socket.remotePort);
    if (request.url === '/') {
        fs.readFile('./pages/index.html', function (error, data) {
            if (error) {
                response.setHeader('Content-Type', 'text/plain; charset=utf8');
                response.end('文件读取失败');
            } else {
                response.setHeader('Content-Type', 'text/html; charset=utf8');
                response.end(data);
            }
        });
    } else if (request.url === '/login') {
        fs.readFile('./pages/login.html', function (error, data) {
            if (error) {
                response.setHeader('Content-Type', 'text/plain; charset=utf8');
                response.end('文件读取失败');
            } else {
                response.setHeader('Content-Type', 'text/html; charset=utf8');
                response.end(data);
            }
        });
    } else if (request.url === '/css') {
        fs.readFile('./css/index.css', function (error, data) {
            if (error) {
                response.setHeader('Content-Type', 'text/plain; charset=utf8');
                response.end('文件读取失败');
            } else {
                response.setHeader('Content-Type', 'text/css; charset=utf8');
                response.end(data);
            }
        });
    } else {
        response.end('404 比阿斯蒂芬')
    }
})

server.listen('8082', function () {
    console.log(8082);
})