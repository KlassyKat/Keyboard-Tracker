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
let colorPickWindow;

//Disable hardware acceleration to allow for capture in obs
app.disableHardwareAcceleration();

//Listen for app to ready
app.on('ready', function () {
    //Create window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        icon: './assets/icons/win/icon.ico'
    });
    //Load html in
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'keyboard.html'),
        protocol: 'file:',
        slashes: true
    }));

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
            label: 'Stroke Color',
            click() {
                colorPickWindow = new BrowserWindow({
                    webPreferences: {
                        nodeIntegration: true
                    },
                    frame: false,
                    width: 600,
                    height: 590,
                    resizable: false
                });
                colorPickWindow.loadURL(url.format({
                    pathname: path.join(__dirname, 'colorpicker.html'),
                    protocol: 'file:',
                    slashes: true
                }));
                colorPickWindow.on('closed', function () {
                    colorPickWindow = null;
                });
            },
            accelerator: 'CmdOrCtrl+E'
        },
        {
            label: 'Highlight Color'
        },
        {
            label: 'Exit',
            accelerator: 'CmdOrCtrl+Q',
            click() {
                app.quit();
            }
        }
    ]
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
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
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

//Open Color Window
ipcMain.on('open-colors',() => {
    colorPickWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        width: 1200,
        height: 590,
        resizable: false
    });
    colorPickWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'colorpicker.html'),
        protocol: 'file:',
        slashes: true
    }));
    colorPickWindow.on('closed', function () {
        colorPickWindow = null;
    });
})

//Open Settings Window
ipcMain.on('open-settings',() => {
    settingsWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        width: 600,
        height: 590,
        resizable: false
    });
    settingsWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'settings.html'),
        protocol: 'file:',
        slashes: true
    }));
    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
})

//Color Picking
ipcMain.on('pick-color', function() {
    mainWindow.webContents.send('color-pick');
})
ipcMain.on('close-color-window', function() {
    colorPickWindow.close();
})

//Close Main Window
ipcMain.on('close-main-window', function() {
    mainWindow.close();
});