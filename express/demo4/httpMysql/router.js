const fs = require('fs');
const url = require('url');
const yewu = require('./yewu');

function bind(app) {
    app.on('request', (request, response) => {
        let urlObj = url.parse(request.url, true);
        if (request.method == 'GET') {
            if (urlObj.pathname == '/') {
                yewu.getAll(request, response);
            } else if (urlObj.pathname == '/getone') {
                yewu.getOne(request, response);
            } else if (urlObj.pathname == '/upuser') {
                yewu.upuser_get(request, response);
            } else if (urlObj.pathname == '/delete') {
                yewu.delete_get(request, response);
            } else {
                fs.readFile('.' + urlObj.pathname, function (error, data) {
                    response.end(data)
                })
            }
        } else if (request.method == 'POST') {
            if (urlObj.pathname == '/upuser') {
                yewu.upuser_post(request, response);
            } else {
                response.end('post')
            }
        } else {
            response.end('sorry')
        }
    })
}

module.exports.bind = bind;