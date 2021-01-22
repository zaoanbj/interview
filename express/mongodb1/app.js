const http = require('http');
const queryString = require('querystring');
const url = require('url');
const mongoose = require('mongoose');
const fs = require('fs');
const app = http.createServer();

mongoose.connect('mongodb://localhost/playground', { useUnifiedTopology: true, useNewUrlParser: true });

let User = mongoose.model('Users', new mongoose.Schema({
    name: {
        type: String,
        maxlength: 20,
        minlength: 2,
        required: true
    },
    age: {
        type: Number,
        max: 20,
        min: 2
    },
    password: String,
    email: String,
    aihao: [String]
}));

app.on('request', async (request, response) => {
    let mothed = request.method;
    let { pathname, query } = url.parse(request.url, true);
    console.log(pathname, query);
    if (mothed == 'GET') {
        if (pathname == '/') {
            response.end('index')
        } else if (pathname == '/list') {
            let res = await User.find();
            let tt = '';
            res.forEach(element => {
                tt += `<li> ${element.name}  ${element.age}  
                            ${element.email}  ${element.aihao}
                            <a href="/edit?id=${element.id}" >edit</a>
                            <a href="/delete?id=${element.id}" >delete</a>
                        </li>`
            });
            response.end(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <a href='/add' >add</a>
                    <a href='/edit' >edit</a>
                    <ol>
                    ${tt}
                    </ol>
                </body>
                </html>
            `)
        } else if (pathname == '/add') {
            response.end(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <form action="/add" method="POST">
                    name<input type="text" value="lisi1" name="name" />
                    pwd <input type="password" value="123123" name="pwd" />
                    age <input type="number" value="11" name="age" />
                    email<input type="text" value="123@qq.com" name="email" />
                        <input type="checkbox" value="aa" name="aihao" checked/>aa
                        <input type="checkbox" value="bb" name="aihao" checked/>bb
                        <input type="checkbox" value="cc" name="aihao" checked/>cc
                        <input type="checkbox" value="dd" name="aihao" checked/>dd
                        <button type="submit">go</button>
                    </form>
                </body>
                </html>
            `)
        } else if (pathname == '/edit') {
            let arr = await User.findOne({ _id: query.id });
            response.end(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <form action="/edit?id=${arr.id}" method="POST">
                    name<input type="text" value="${arr.name}" name="name" />
                    pwd <input type="password" value="${arr.pwd}" name="pwd" />
                    age <input type="number" value="${arr.age}" name="age" />
                    email<input type="text" value="${arr.email}" name="email" />
                        <input type="checkbox" value="aa" name="aihao" />aa
                        <input type="checkbox" value="bb" name="aihao" />bb
                        <input type="checkbox" value="cc" name="aihao" />cc
                        <input type="checkbox" value="dd" name="aihao" />dd
                        <button type="submit">edit</button>
                    </form>
                </body>
                </html>
            `)
        } else if (pathname == '/delete') {
            console.log('query.id', query.id);
            await User.findOneAndDelete({ _id: query.id });
            response.writeHead(301, {
                Location: '/list'
            })
            response.end();
        }
    } else if (mothed == 'POST') {
        if (pathname == '/add') {
            let arr = '';
            request.on('data', (data) => {
                arr += data
            })
            request.on('end', (data) => {
                // console.log(queryString.parse(arr));
                User.create(queryString.parse(arr)).then(value => {
                    // console.log(value)
                    // response.end('<script>window.location.href = "/list"</script>')
                    response.writeHead(301, {
                        Location: '/list'
                    })
                    response.end();
                });
            })
        } else if (pathname == '/edit') {
            let arr = '';
            request.on('data', (data) => {
                arr += data
            })
            request.on('end', (data) => {
                User.updateOne({ _id: query.id }, queryString.parse(arr)).then(value => {
                    response.writeHead(301, {
                        Location: '/list'
                    })
                    response.end();
                });
            })
        }
    }
})

app.listen(3000, () => {
    console.log('3000 ok');
})

/*
User
    .create({ name: 'zhang5', age: 15, password: '123123', email: '332792314@qq.com', aihao: ['aa', 'bb', 'cc'] })
    .then(value => console.log(value));
 */