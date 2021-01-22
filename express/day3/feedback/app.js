const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use('/public/', express.static('./public/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.engine('html', require('express-art-template'));

const arr = [];

app.get('/', (request, response) => {
    response.render('index.html', {
        arr
    })
})
app.get('/post', (request, response) => {
    response.render('post.html')
})
app.post('/post', (request, response) => {
    let obj = request.body;
    arr.unshift(obj);
    response.redirect('/');
})

/* 
app.get('/pinglun', (request, response) => {
    let obj = request.query;
    arr.unshift(obj);
    response.redirect('/');
}) 
*/

app.listen(3000, () => {
    console.log('3000, ok');
})