const express = require('express');
const fs = require('fs');
const app = express();
const routers = require('./routers');
const bodyParser = require('body-parser');
const { urlencoded } = require('express');

app.use('/public/', express.static('./public/'));
app.use('/node_modules/', express.static('./node_modules/'));

app.engine('html', require('express-art-template'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(routers);

app.listen(3000, () => {
    console.log('3000, ok');
})