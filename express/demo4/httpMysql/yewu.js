const url = require('url');
const queryString = require('querystring');
const template = require('art-template');
template.defaults.root = './views/';
const db = require('./db');

module.exports = {
    getAll(request, response) {
        db.select(function (data) {
            response.end(template('./index.html', { arr: data }));
        });
    },
    getOne(request, response) {
        let urlObj = url.parse(request.url, true);
        db.where('id=' + urlObj.query.id).select(function (data) {
            response.end(template('./detail.html', { data: data[0] }));
        })
    },
    upuser_get(request, response) {
        let urlObj = url.parse(request.url, true);
        db.where('id=' + urlObj.query.id).select(function (data) {
            response.end(template('./upuser.html', { data: data[0] }));
        })
    },
    upuser_post(request, response) {
        let urlObj = url.parse(request.url, true);
        let datas = '';
        request.on('data', function (data) {
            datas += data;
        })
        request.on('end', function () {
            // console.log(queryString.parse(datas));
            db.where('id=' + urlObj.query.id).update(queryString.parse(datas), function (data) {
                if (data >= 1) {
                    response.setHeader('Content-type', 'text/html;charset=utf-8');
                    response.end('<script>alert("update success!")</script>')
                }
            })
        })
    },
    delete_get(request, response) {
        let urlObj = url.parse(request.url, true);
        db.where('id=' + urlObj.query.id).delete(function (data) {
            if (data >= 1) {
                response.setHeader('Content-type', 'text/html;charset=utf-8');
                response.end('<script>alert("delete success!")</script>')
            }
        })
    }
}


