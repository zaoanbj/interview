const express = require('express');
const fs = require('fs')
const app = express();
const formidable = require('formidable');

app.engine('html', require('express-art-template'));

app.get('/', (Request, response) => {
    response.send(`<form action="/post" method="post" enctype="multipart/form-data">
    <input type="file" name="img" />
    <button type="submit">go</button>
</form>`);
})
app.post('/post', (request, response) => {
    let form = new formidable.IncomingForm();
    form.uploadDir='./public';
    form.parse(request, (error, fields, files) => {
        console.log(files.img.path, files.img.name);
        fs.rename(files.img.path, './img/' + files.img.name, (err) => {
            console.log(err);
        })
    })
})

app.listen(4000, () => {
    console.log('4000 , ok');
})