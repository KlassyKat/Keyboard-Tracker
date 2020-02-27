// ./build_installer.js

// 1. Import Modules 
const { MSICreator } = require('electron-wix-msi');
const path = require('path');

// 2. Define input and output directory
// Important: directories must be absolute
//appDirectory C:\Users\gabea\Documents\GitHub\Floodz-Keyboard\release-builds\FloodzKeyboard-win32-ia32
const APP_DIR = path.resolve(__dirname, './release-builds/FloodzKeyboard-win32-ia32');
const OUT_DIR = path.resolve(__dirname, './windows-installer');

// 3. Instantiate the MSI Creator
const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    // Configure metadata
    description: 'Keyboard tracker for twitch.tv/floodz',
    exe: 'FloodzKeyboard',
    name: 'Floodz Keyboard',
    manufacturer: 'Gabe Alexander',
    version: '0.8.0',

    // Configure installer user interface
    ui: {
        chooseDirectory: true
    }
});

// 4. Create a .wxs template file
msiCreator.create().then(function() {

    // 5. Compile the template to msi file
    msiCreator.compile();
})