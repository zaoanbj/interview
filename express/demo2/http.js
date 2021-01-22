const http = require('http');
const fs = require('fs');
const app = http.createServer();

app
    .on('request', (request, response) => {
        // console.log(request.url);
        if (request.url == '/') {
            fs.readFile('./index.html', function (error, data) {
                response.end(data)
            })
        } else if (request.url == '/post') {
            response.setHeader('Access-Control-Allow-Origin', '*');
            fs.readdir('./', 'utf8', function (error, data) {
                const arr = [], arrl = data.length-1;
                data.map((item, index) => {
                    fs.stat(item, function (error, data) {
                        let f = 1
                        if(data.isFile()){
                            f = '1'
                        } else {
                            f = 'default'
                        }
                        arr[index] = {type: f, name: item, ctime: data.ctime, size: data.size };
                        if (index == arrl) {
                            response.end(JSON.stringify(arr))
                        }
                    })
                })
            })
        } else {
            fs.readFile('.' + request.url, function (error, data) {
                response.end(data)
            })
        }
    })
    .listen(3000, () => {
        console.log('ok');
    })