const express = require('express');
const cookieSession = require('cookie-session');
const path = require('path');
const app = express();
const router = require('./router');

app.use('/public/', express.static(path.join(__dirname, 'public')));
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')));

app.use(cookieSession({
    name: 'zaoan',
    keys: ['beijing']
}));
app.use(router);
app.engine('html', require('express-art-template'));

app
    .listen(3000, () => {
        console.log('3000 ok!');
    })