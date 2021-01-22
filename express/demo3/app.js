const http = require('http');
const fs = require('fs');
const template = require('art-template');

const app = http.createServer();

template.defaults.root = './views/';

app
    .on('request', (request, response) => {
        if (request.url == '/') {
            fs.readdir('./', 'utf8', function (error, data) {
                const arr = [], arrl = data.length - 1;
                data.map((item, index) => {
                    fs.stat(item, function (error, data) {
                        let f = 1
                        if (data.isFile()) {
                            f = '1'
                        } else {
                            f = 'default'
                        }
                        arr[index] = { type: f, name: item, ctime: data.ctime, size: data.size };
                        if (index == arrl) {
                            let h = template('index.html', { arr })
                            response.end(h)
                        }
                    })
                })
            })
        } else {
            fs.readFile('.' + request.url, (error, data) => {
                response.end(data);
            })
        }
    })
    .listen(3000, () => {
        console.log('3000 ok');
    })