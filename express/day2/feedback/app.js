const http = require('http');
const fs = require('fs');
const template = require('art-template');
const url = require('url');

const arr = [
    {
        name: 'zhang1',
        message: 'hahaha'
    },
    {
        name: 'zhang2',
        message: 'hahaha'
    },
    {
        name: 'zhang3',
        message: 'hahaha'
    }
]

http
    .createServer((request, response) => {
        let urlParse = url.parse(request.url, true)
        console.log('urlParse.query', urlParse.query);
        let pathName = urlParse.pathname;
        console.log('parseName', pathName);
        if (pathName === '/') {
            fs.readFile('./views/index.html', (error, data) => {
                if (error) {
                    return response.end('404')
                }
                let tpl = template.render(data.toString(), { arr })
                response.end(tpl)
            })
        } else if (pathName === '/post') {
            fs.readFile('./views/post.html', (error, data) => {
                if (error) {
                    return response.end('404')
                }
                response.end(data)
            })
        } else if (pathName === '/pinglun') {
            arr.push(urlParse.query);
            response.statusCode = 302;
            response.setHeader('Location', '/');
            response.end('pinglun')
        } else if (pathName.indexOf('/public/') == 0) {
            fs.readFile('.' + pathName, (error, data) => {
                if (error) {
                    return response.end('404')
                }
                response.end(data)
            })
        } else {
            response.end('404 not fount')
        }
    })
    .listen('3000', () => {
        console.log('3000 ok');
    })