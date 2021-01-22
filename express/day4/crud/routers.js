const fs = require('fs');
const express = require('express');
const routers = express.Router();
const xs = require('./xs');

routers.get('/', (request, response) => {
    xs.find((error, data) => {
        if (error) {
            return response.status(500).send('XXXX');
        }
        response.render('index.html', {
            shuiguo: ['asd', 'asdf', 'afef', 'gafas'],
            xs: data
        })
    })
})
routers.get('/xs/new', (request, response) => {
    response.render('new.html');
})
routers.post('/xs/new', (request, response) => {
    xs.save(request.body, function (err) {
        if (err) {
            return response.status(500).send('XXXX');
        } else {
            response.redirect('/')
        }
    })
})
routers.get('/xs/edit', (request, response) => {
    xs.findId(JSON.parse(request.query.id), function (err, data) {
        if (err) {
            return response.status(500).send('XXXX');
        }
        // console.log(data);
        response.render('edit.html', { xs: data })
    })
})
routers.post('/xs/edit', (request, response) => {
    let d = request.body;
    // console.log(d);
    xs.updata(request.body, function (err) {
        if (err) {
            console.log(err);
        }
        response.redirect('/')
    })
})
routers.get('/xs/delete', (request, response) => {
    // console.log(request.query.id);
    xs.deleteId(request.query.id, (error) => {
        if (error) {
            return response.status(500).send('XXXX');
        }
        response.redirect('/')
    })
})
module.exports = routers;

/*
module.exports = function (app) {

    app.get('/', (request, response) => {
        fs.readFile('./db.json', (error, data) => {
            if (error) {
                return response.status(500).send('XXXX');
            }
            response.render('index.html', {
                shuiguo: ['asd', 'asdf', 'afef', 'gafas'],
                xs: JSON.parse(data).xs
            })
        })
    })

    app.get('/xs', (request, response) => {
        response.send('xd')
    })
}
 */

/*
fs.readFile('./db.json', (error, data) => {
   if (error) {
       return response.status(500).send('XXXX');
   }
   response.render('index.html', {
       shuiguo: ['asd', 'asdf', 'afef', 'gafas'],
       xs: JSON.parse(data).xs
   })
})
*/