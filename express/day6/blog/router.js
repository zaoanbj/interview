const express = require('express');
const router = express.Router();
const User = require('./models/user');

router.get('/', (request, response) => {
    console.log(request.session.user);
    response.render('index.html', {
        user: request.session.user
    })
})

router.get('/logout', (request, response) => {
    request.session.user = null;
    response.redirect('/login');
})
router.get('/login', (request, response) => {
    console.log(request.session.user);
    response.render('login.html')
})
router.post('/login', (request, response) => {
    let body = request.body;
    User.findOne({
        email: body.email,
        password: body.password
    }, function (error, user) {
        if (error) {
            return response.status(500).json({
                err_code: 500,
                msg: 'server error name or email'
            });
        }
        if (!user) {
            return response.status(200).json({
                err_code: 1,
                msg: 'name password error is invalid'
            });
        }
        request.session.user = user;
        response.status(200).json({
            err_code: 0,
            msg: 'ok'
        })
    })
})

router.get('/register', (request, response) => {
    response.render('register.html')
})
router.post('/register', async (request, response) => {
    let body = request.body;
    try {
        if (await User.findOne({ email: body.email })) {
            return response.status(200).json({
                err_code: 1,
                msg: '邮箱已存在 '
            });
        }
        if (await User.findOne({ name: body.name })) {
            return response.status(200).json({
                err_code: 1,
                msg: '用户已存在 '
            });
        }
        await new User(body).save(function (error, user) {
            request.session.user = user;

            response.status(200).json({
                err_code: 0,
                msg: 'OK'
            })
        })
    } catch (error) {
        response.status(500).json({
            err_code: 500,
            msg: error.message
        });
    }
})

module.exports = router;

/*
User.findOne({
    $or: [
        { email: body.email },
        { name: body.name }
    ]
}, function (error, data) {
    if (error) {
        return response.status(500).json({
            err_code: 0,
            msg: 'server error name or email'
        });
    }
    if (data) {
        return response.status(200).json({
            err_code: 1,
            msg: '已存在'
        });
    }
    new User(body).save(function(error, user){
        if (error) {
            return response.status(500).json({
                err_code: 500,
                msg: 'save server error'
            });
        }
        response.status(200).json({
            err_code: 0,
            msg: 'ok'
        })
    })
})
*/