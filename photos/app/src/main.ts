import { app, BrowserWindow } from 'electron';
import {enableLiveReload} from 'electron-compile';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

let win: BrowserWindow;

const createWindow = () => {
  enableLiveReload({ strategy: 'react-hmr' });
  win = new BrowserWindow();
  win.loadFile('src/index.html');

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
