const fs = require('fs');
const yewu = require('./yewu');

function router(app) {
    app.on('request', (request, response) => {
        if (request.url == '/') {
            response.end(yewu.html)
        } else {
            fs.readFile('.' + request.url, (error, data) => {
                response.end(data);
            })
        }
    })
}

exports.server = router;