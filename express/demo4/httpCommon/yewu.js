const fs = require('fs');
const template = require('art-template');
template.defaults.root = './views/';


fs.readdir('./', 'utf8', function (error, data) {
    const arr = [], arrl = data.length - 1;
    data.map((item, index) => {
        fs.stat(item, function (error, data) {
            let f = 1
            if (data.isFile()) {
                f = '1'
            } else {
                f = 'default'
            }
            arr[index] = { type: f, name: item, ctime: data.ctime, size: data.size };
            if (index == arrl) {
                let h = template('index.html', { arr })
                exports.html = h;
            }
        })
    })
})

