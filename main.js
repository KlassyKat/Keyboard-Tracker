'use strict'
const electron = require('electron');
const {
    app,
    BrowserWindow,
    Menu,
    ipcMain,
    screen
} = electron;
const iohook = require('iohook')
const localServer = require('./server.js');
const windowStateKeeper = require('electron-window-state');

let mainWindow;
let mainWindowState;

//Disable hardware acceleration to allow for capture in obs
app.disableHardwareAcceleration();

app.on('ready', () => {
    mainWindowState = windowStateKeeper({
        maximize: true
    });

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            backgroundThrottling: false
        },
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        minWidth: 500,
        minHeight: 300,
        // frame: false,
        backgroundColor: '#212121',
        // icon: './buildResources/icon.ico'
    });

    mainWindow.loadFile(`${__dirname}/main.html`);

    mainWindow.on('closed', () => {
        app.quit();
    });

    mainWindowState.manage(mainWindow);


    //Key tracking
    iohook.on('keydown', e => {
        localServer.keyPress(e.keycode);
    })


    //Settings Window

    // Start Local Server
    app.server = localServer.createServer();
    iohook.start();
});

ipcMain.on('new-keyboard', () => {
    let filepath = `${__dirname}/keyboards/fullKeyboard.html`
    localServer.newKeyboard(filepath);
})