const url = require('url');
const queryString = require('querystring');
const formidable = require('formidable');
const fs = require('fs');
const db = require('./db');
const { request } = require('express');

module.exports = {
    login_get(request, response) {
        response.render('login.html', {});
    },
    login_post(request, response) {
        let f = new formidable.IncomingForm();
        f.parse(request, (error, fields, files) => {
            if (fields.name == 'admin' && fields.pw == '123') {
                request.session.cs = fields
                response.send('<script>alert("login success!");window.location.href = "/";</script>')
            } else {
                response.send('<script>alert("login sorry!");window.location.href = "/login";</script>')
            }
        })
    },
    getAll(request, response) {
        // console.log('session', request.session.cs);
        if (!request.session.cs) {
            response.send('<script>alert("login !");window.location.href = "/login";</script>');
            return;
        }
        db.select(function (data) {
            response.render('index.html', { arr: data });
        });
    },
    getOne(request, response) {
        let urlObj = url.parse(request.url, true);
        db.where('id=' + urlObj.query.id).select(function (data) {
            response.render('detail.html', { data: data[0] });
        })
    },
    upuser_get(request, response) {
        let urlObj = url.parse(request.url, true);
        db.where('id=' + urlObj.query.id).select(function (data) {
            response.render('upuser.html', { data: data[0] });
        })
    },
    upuser_post(request, response) {
        let urlObj = url.parse(request.url, true);
        let fi = new formidable.IncomingForm();
        fi.uploadDir = './public';
        fi.parse(request, (error, fileds, files) => {

            let img_path = '/img/' + files.img.name;
            fileds.img = files.img.name

            fs.rename(files.img.path, './public/' + img_path, (error) => {
                db.where('id=' + urlObj.query.id).update(fileds, function (data) {
                    if (data >= 1) {
                        response.setHeader('Content-type', 'text/html;charset=utf-8');
                        response.send('<script>alert("update success!");window.location.href = "/";</script>')
                    }
                })
            })
        })
    },
    delete_get(request, response) {
        let urlObj = url.parse(request.url, true);
        db.where('id=' + urlObj.query.id).delete(function (data) {
            if (data >= 1) {
                response.setHeader('Content-type', 'text/html;charset=utf-8');
                response.send('<script>alert("delete success!");window.location.href = "/";</script>')
            }
        })
    }
}


