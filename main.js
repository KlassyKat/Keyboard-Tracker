const electron = require('electron');
const url = require('url');
const path = require('path');
const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = electron;
let mainWindow;
let settingsWindow;

//Disable hardware acceleration to allow for capture in obs
app.disableHardwareAcceleration();

//Listen for app to ready
app.on('ready', function () {
    //Create window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        },
        frame: false,
        backgroundColor: '#252525',
        minimizable: false
    });
    //Load html in
    mainWindow.loadFile(`${__dirname}/main.html`);
    //Quit app when closed
    mainWindow.on('closed', function () {
        app.quit();
    });

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
});


//Create menu
const mainMenuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'Exit',
        click() {
            app.quit();
        }
    }]
}];

//Add empty object to menu if mac
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

//Add developer tool if test env
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [{
                label: 'Toggle Dev',
                accelerator: 'CmdOrCtrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}


//Open Settings Window
ipcMain.on('open-settings', () => {
    settingsWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        width: 600,
        height: 590,
        resizable: false,
        show: false,
        backgroundColor: '#808080',
        offscreen: true,
        parent: mainWindow,
        modal: true
    });
    settingsWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'settings.html'),
        protocol: 'file:',
        slashes: true
    }));
    settingsWindow.once('ready-to-show', () => {
        settingsWindow.show();
    });
    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
});

//Window handeling
ipcMain.on('open-settings', () => {
    settingsWindow.show();
})

//Setting window
ipcMain.on('close-setting-window', () => {
    settingsWindow.close();
});
ipcMain.on('apply-settings', () => {
    mainWindow.webContents.send('load-settings');
});

//Close Main Window
ipcMain.on('close-main-window', function () {
    mainWindow.close();
});