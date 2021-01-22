const http = require('http');
const fs = require('fs');
const template = require('art-template');
const server = http.createServer();

server.on('request', (request, Response) => {
    let url = request.url;
    let fileUrl = '/index.html';
    if (url !== '/') {
        url = fileUrl
    }
    fs.readFile('./www/' + fileUrl, (error, data) => {
        if (error) {
            return Response.end('404 not fount')
        }
        fs.readdir('./www', (error, data)=>{
            if (error) {
                return Response.end('404 not fount')
            }
            let tpl = '';
            data.forEach(item => {
                tpl += `<div>${item}</div>` 
            });
            Response.end(tpl)
        });
        // Response.end(data)
    })
})

server.listen('3000', () => {
    console.log('3000 ok');
})