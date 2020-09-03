const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');

exports.createServer = () => {
    app.get('/', (req, res) => {
        res.sendFile(`${__dirname}/browserCapture.html`);
    });

    http.listen(3000, () => {
        console.log('listening on 3000');
    });
}

exports.keyPress = (key) => {
    console.log(key);
    io.emit('keypress', {keycode: key});
}

exports.newKeyboard = (filepath) => {
    console.log(filepath)
    fs.readFile(filepath, (error, filedata) => {
        if(error) throw error;
        else io.emit("new-keyboard", filedata.toString());
    });
}