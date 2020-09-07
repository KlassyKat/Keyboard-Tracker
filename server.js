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
exports.keyRelease = (key) => {
    io.emit('keyrelease', {keycode: key});
}

exports.newKeyboard = (htmlFile) => {
    fs.readFile(htmlFile, (error, filedata) => {
        if(error) throw error;
        else io.emit("new-keyboard", filedata.toString());
    });
}

exports.applySettings = (settings) => {
    try {
        io.emit('settings', settings);
    } catch(err) {
        console.log(err);
    }
}