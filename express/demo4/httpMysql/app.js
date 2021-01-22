const http = require('http');
const server = http.createServer();
const router = require('./router');

router.bind(server);

server.listen(3000, () => {
    console.log('3000 ok');
})