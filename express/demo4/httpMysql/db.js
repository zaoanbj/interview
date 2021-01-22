const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '192.168.245.128',
    user: 'root',
    password: 'root',
    database: 'node'
});

connection.connect();

module.exports = {
    where(wh) {
        this.wh = wh;
        return this;
    },
    select(callback) {
        let sql;
        if (this.wh === undefined) {
            sql = 'select * from users';
        } else {
            sql = `select * from users where ${this.wh}`;
        }
        connection.query(sql, (error, sql_data) => {
            callback(sql_data)
        })
        // connection.end()
        this.wh = undefined;
    },
    update(data, callback) {
        if (this.wh == undefined) {
            console.log('sorry');
            return;
        }
        var str = '';
        for (i in data) {
            str += `${i}="${data[i]}",`
        }
        str = str.slice(0, str.length - 1);
        let sql = `update users set ${str} where ${this.wh}`;
        connection.query(sql, (error, sql_data) => {
            callback(sql_data.changedRows)
        })
        this.wh = undefined;
    },
    delete(callback) {
        if (this.wh == undefined) {
            console.log('sorry');
            return;
        }
        let sql = `delete from users where ${this.wh}`;
        connection.query(sql, (error, sql_data) => {
            callback(sql_data.affectedRows)
        })
        this.wh = undefined;
    }
}










/* const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '192.168.245.128',
    user: 'root',
    password: 'root',
    database: 'node'
});

connection.connect();

module.exports.getData = function (callback) {
    connection.query('select * from users', function (err, res, filed) {
        callback(res)
    });
    // connection.end();
};

module.exports.getOne = function (id, callback) {
    let str = 'select * from users where id=' + id
    connection.query(str, function (err, res, filed) {
        callback(res)
    });
    // connection.end();
}; */