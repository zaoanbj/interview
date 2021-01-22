const express = require('express');
const router = express.Router();
const operation = require('./operation');

router
    .get('/', operation.getAll)
    .get('/getOne', operation.getOne)
    .get('/upuser', operation.upuser_get)
    .post('/upuser', operation.upuser_post)
    .get('/delete_get', operation.delete_get)
    .get('/login', operation.login_get)
    .post('/login', operation.login_post)

module.exports = router;