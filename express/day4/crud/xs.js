const fs = require('fs');
const db = './db.json';

exports.find = function (callback) {
    fs.readFile(db, 'utf-8', (error, data) => {
        if (error) {
            callback(error)
        }
        callback(null, JSON.parse(data).xs);
    })
}
exports.findId = function (id, callback) {
    fs.readFile(db, 'utf-8', (error, data) => {
        if (error) {
            callback(error)
        }
        let XS = JSON.parse(data).xs;
        let result = XS.find(item => item.id == id);
        callback(null, result);
    })
}
exports.save = function (xs, callback) {
    fs.readFile(db, 'utf-8', (error, data) => {
        if (error) {
            callback(error)
        }
        const XS = JSON.parse(data).xs;
        xs.id = XS[XS.length - 1].id * 1 + 1;
        XS.push(xs)
        // console.log('XS',XS);
        var result = JSON.stringify({ xs: XS })
        // console.log('result', result);
        fs.writeFile(db, result, (error) => {
            if (error) {
                callback('error');
            }
            callback(null)
        })
    })
}
exports.updata = function (xs, callback) {
    fs.readFile(db, 'utf-8', (error, data) => {
        if (error) {
            callback(error)
        }
        let XS = JSON.parse(data).xs;

        /* let id = xs.id;
        XS.forEach((item, i) => {
            if (item.id == id) {
                return XS.splice(i, 1, xs);
            }
        }); */

        let findxs = XS.find(item => item.id == xs.id);
        for (let key in xs) {
            findxs[key] = xs[key]
        }
        let result = JSON.stringify({ xs: XS });
        fs.writeFile(db, result, (error) => {
            if (error) {
                callback(error)
            }
            callback(null)
        })
    })
}
exports.deleteId = function (id, callback) {
    fs.readFile(db, 'utf-8', (error, data) => {
        if (error) {
            callback(error)
        }
        let XS = JSON.parse(data).xs;
        XS = XS.filter(item => item.id != id);
        let result = JSON.stringify({ xs: XS })
        console.log(result);
        fs.writeFile(db, result, (error) => {
            if (error) {
                callback(error)
            }
            callback(null)
        })
    })
}