const http = require('http');
const app = http.createServer();
const router = require('./router');

// console.log(router);
router.server(app);

app.listen(3000, ()=>{
    console.log('ok');
})