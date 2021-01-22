const { response } = require('express');
const express = require('express');

const app = express();
app.use('/public/', express.static('./public/'));

app.all('/', (request, response) => {
    response.end(
        `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                首页
            </body>
            </html>
        `
    )
})

app.get('/about', (request, response) => {
    response.end('hello about')
})

app.listen(3000, () => {
    console.log('3000 , ok!');
})