// const { response, static } = require('express');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const router = require('./router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public/', express.static(path.join(__dirname, './public/')));
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')));
app.use(session({
    secret: 'blog',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}))

app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views/'));

app.use(router);

app.listen(3000, () => {
    console.log('3000, ok');
})