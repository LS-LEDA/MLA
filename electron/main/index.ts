'use strict'
import { app, protocol, BrowserWindow, webContents, shell, ipcMain, Tray, Menu, nativeImage, screen } from 'electron'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import { join } from 'path';
require('v8-compile-cache') // via: https://dev.to/xxczaki/how-to-make-your-electron-app-faster-4ifb


export const ROOT_PATH = {
    // /dist
    dist: join(__dirname, '../..'),
    // /dist or /public
    public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}

const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
// MLA application user settings
const indexHtml = join(ROOT_PATH.dist, 'index.html');
import config from "/src/config";

// Application variables
let tray = null;
let win: BrowserWindow | null = null;
// Check Hardware Acceleration setting
if ( config.get('general.gpu') !== true ) {
    console.log("GPU disabled")
    app.disableHardwareAcceleration();
}

// Check open MLA on startup
if ( !app.isPackaged ) {
    app.setLoginItemSettings( {
        openAtLogin: config.get('general.openOnStartup')
    });
}

let iconPath = join(ROOT_PATH.public, '/assets/mla_logo.png');
const preload = join(__dirname, '../preload/index.js')

/**
 * Applies selected settings
 * @param setting: setting key
 * @param setting_value: setting value
 */
function applySettings(setting: any, setting_value: any) {
    switch (setting) {
        case 'general.openOnStartup':
            if ( !app.isPackaged ) {
                app.setLoginItemSettings( {
                    openAtLogin: setting_value
                })
            }
            break;
        default:
            console.log("Uncontrolled setting")
    }
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
        let setting = JSON.parse(args);
        config.set(setting.key, setting.value);
        applySettings(args.key, args.value);
    } catch (err) {
        event.reply('write_settings', err);
    }
});

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
])

// TODO: OS dependant icon
/**
 * Fired after createWindow
 * Creates MLA's tray with its icon & menu
 */
function createTray() {
    let trayImage = nativeImage.createFromPath(iconPath);
    trayImage.resize({
        width: 32,
        height: 32
    })
    tray = new Tray(trayImage);
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
            win.show();
            win.webContents.send('read_tray_item', { name: 'import-data'})
            break;
        case 2:
            win.show();
            win.webContents.send('read_tray_item', { name: 'dashboard'})
            break;
        case 3:
            win.show();
            win.webContents.send('read_tray_item', { name: 'plugins'})
            break;
        case 4:
            win.show();
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


// Quit when all windows are closed.
app.on('window-all-closed', () => {
    win.hide();
})

app.on('activate', async () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) await createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (!app.isPackaged) {
        // Install Vue Devtools
        try {
            //await installExtension(VUEJS3_DEVTOOLS)
            installExtension(VUEJS3_DEVTOOLS)
                .then((name) => console.log(`Added Extension:  ${name}`))
                .catch((err) => console.log('An error occurred: ', err));
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    createTray();
    await createWindow();
})

// Fired before quitting the application
app.on('before-quit', () => {
    // Remove all IPC listeners
    win.webContents.removeAllListeners();
})

// Exit cleanly on request from parent process in development mode.
if (app.isPackaged) {
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

async function createWindow() {
    // Create a window that fills the screen's available work area.
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize

    win = new BrowserWindow({
        width: width,
        height: height,
        minWidth: 700,
        minHeight: 500,
        // Don't show the window until it's ready, this prevents any white flickering
        show: false,
        icon: join(ROOT_PATH.public, 'assets/mla_logo.png'),
        webPreferences: {
            preload,
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    // Hide App Menu & maximize the window
    win.setMenu(null);
    win.maximize();

    // Hide application window
    win.on('close', (e) => {
        e.preventDefault();
        if ( config.get('general.tray') ) {
            win.hide()
        } else {
            win.destroy();
            win = null;
            app.quit();
        }
        return false;
    })

    if (app.isPackaged) {
        win.loadFile(indexHtml)
    } else {
        // Load from vite dev server and use devTool if the app is not packaged
        win.loadURL(url)
        win.webContents.openDevTools({
            mode: "detach"
        });
    }

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) shell.openExternal(url)
        return { action: 'deny' }
    });
}
