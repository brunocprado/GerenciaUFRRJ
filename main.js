const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let janela;

function createWindow () {
    janela = new BrowserWindow({
        title: "Gerencia UFRRJ",
        titleBarStyle: 'hidden',
//          transparent: true,
    //      frame: false,
        minWidth: 1050,
        minHeight: 650,
        width: 1280, 
        height: 720,
        icon: 'icone.ico',
        show: false
    });
    janela.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    janela.webContents.openDevTools()

    janela.on('closed', function () {
        janela = null
    });

    janela.setMenu(null);
    janela.once('ready-to-show',() => {
       janela.show(); 
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', function () {
    if (janela === null) {
        createWindow();
    }
})