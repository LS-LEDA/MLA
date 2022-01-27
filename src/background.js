'use strict'

import { app, protocol, BrowserWindow, webContents, shell, ipcMain, Tray, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const path = require('path')
const isDevelopment = process.env.NODE_ENV !== 'production'
require('v8-compile-cache') // via: https://dev.to/xxczaki/how-to-make-your-electron-app-faster-4ifb

// MLA application user settings
import config from "@/config";

// Application variables
let tray = null;
let win = null;

// Check Hardware Acceleration setting
if ( config.get('general.gpu') !== true ) {
    console.log("GPU disabled")
    app.disableHardwareAcceleration();
}

/**
 * IPC Read Settings handler.
 * Returns an object of the user saved settings
 * @param args: array of settings to retrieve ['general, 'theme']
 */
ipcMain.on('read_settings', (event, args) => {
    let settings = {}
    args.forEach( (setting) => {
        settings[setting] = config.get(setting)
    });

    event.reply('read_settings', settings );
});

/**
 * IPC Write Settings handler
 * Returns an error if something went wrong
 * @param args: Object containing the changes of a setting to be made
 * @example { key: 'general.gpu', value: true }
 */
ipcMain.on('write_settings', (event, args) => {
    try {
        config.set(args.key, args.value)
    } catch (err) {
        event.reply('write_settings', err);
    }
});

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
    // We cannot require the screen module until the app is ready.
    const { screen } = require('electron')

    // Create a window that fills the screen's available work area.
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize

    // Create the browser window.
    win = new BrowserWindow({
        width: width,
        height: height,
        minWidth: 700,
        minHeight: 500,
        // Don't show the window until it's ready, this prevents any white flickering
        show: false,
        icon: path.join(__dirname, '/bundled/assets/mla_logo.png'),
        webPreferences: {

            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            // __static is set by webpack and will point to the public directory
            //https://medium.com/swlh/how-to-safely-set-up-an-electron-app-with-vue-and-webpack-556fb491b83
            preload: path.resolve(__static, 'preload.js'),
        }
    })

    // Hide App Menu & maximize the window
    win.setMenu(null);
    win.maximize();

    // Hide application window
    win.on('close', (e) => {
        e.preventDefault();
        win.hide()
        return false;
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools({
            mode: "detach"
        })
        win.show();
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html').then( () => {
            win.show()
        })

        // Opens external links in user's default browser
        webContents.setWindowOpenHandler( ({url}) => {
            shell.openExternal(url)
            return { action: "allow"}
        });
    }
}

/**
 * Fired after createWindow
 * Creates MLA's tray with its icon & menu
 */
function createTray() {
    tray = new Tray(path.join(__dirname, '/bundled/assets/mla_logo.png'))
    const contextMenu = Menu.buildFromTemplate([
        { id: 0, label: 'MLA webpage', click: trayMenuAction },
        { type: 'separator' },
        { id: 1, label: 'Import Data', click: trayMenuAction },
        { id: 2, label: 'Dashboard', click: trayMenuAction },
        { id: 3, label: 'Plugins', click: trayMenuAction },
        { id: 4, label: 'Settings', click: trayMenuAction },
        { type: 'separator' },
        { id: 5, label: 'Check for updates', click: trayMenuAction },
        { id: 6, label: 'Quit MLA', click: trayMenuAction }
    ]);

    // Show hidden window
    tray.on('click', () => {
        win.show();
    })

    // Shown on tray hover
    tray.setToolTip('MLA')
    tray.setContextMenu(contextMenu)
}

/**
 * Handles the click events for each menu item in MLA's tray
 * @param menuItem Contains information related to the selected item
 * @returns {Promise<void>}
 */
async function trayMenuAction(menuItem) {
    switch (menuItem.id) {
        case 0:
            await shell.openExternal('https://ls-leda.github.io/Moodle-Learning-Analytics/')
            break;
        case 1:
            win.webContents.send('read_tray_item', { name: 'import-data'})
            break;
        case 2:
            win.webContents.send('read_tray_item', { name: 'dashboard'})
            break;
        case 3:
            win.webContents.send('read_tray_item', { name: 'plugins'})
            break;
        case 4:
            win.webContents.send('read_tray_item', { name: 'settings'})
            break;
        case 5:
            // TODO: MLA auto-Updater
            break;
        // Quit MLA destroys the main window & quits from the app
        case 6:
            win.destroy()
            win = null;
            app.quit();
            break;
        default:
            console.log("The selected item doesn't exist");
    }
}


/*// Quit when all windows are closed.
app.on('window-all-closed', () => {
    win.hide();
})*/

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS3_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    await createWindow()
    createTray();
})

// Fired before quitting the application
app.on('before-quit', () => {
    // Remove all IPC listeners
    win.webContents.removeAllListeners();
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
