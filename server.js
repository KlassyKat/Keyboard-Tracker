const express = require('express');

function createServer(app) {
    const server = express();
    // server.get('/keyboard-tracker', (req, res) => {
    //     res.send(app.respondToClient(req));
    // });
    server.use('/', express.static(__dirname))
    server.listen(9999, () => {
        console.log('Listening...')
    })
}

module.exports = {
    createServer
}