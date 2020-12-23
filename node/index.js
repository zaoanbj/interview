const express = require('express');
const app = express();
app.all('/ie', function (request,response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.send('ie111');
})

app.get('/server', function (request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send('holle!!');
})

app.post('/server', function (request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send('holle');
})

app.all('/server', function (request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.send('holle');
})

app.all('/json-server', function (request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    const obj = {
        a: 100,
        b: 200
    }
    response.send(JSON.stringify(obj));
})

app.get('/delay', function(request,response){
    response.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(()=>{
        response.send('delay');
    }, 2000)

})

app.all('/axios', function(request,response){
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-headers', '*');
    response.send('axios');
})

app.all('/fetch', function(request,response){
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-headers', '*');
    response.send('fetchsdfasdf f');
})

app.listen(8000, ()=>{
    console.log('ok');
})

//Access-Control-Allow-Origin