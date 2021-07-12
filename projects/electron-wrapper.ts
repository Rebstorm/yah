import {app, BrowserWindow, powerSaveBlocker} from 'electron';
import * as path from 'path';
import * as url from 'url';

function getUrl(): string {
  return url.format({
    pathname: path.join(__dirname, 'yah/index.html'),
    protocol: 'file:',
    slashes: true,
  });
}
function createWindow(): void {

  const iconPath = path.join(__dirname, '/assets/favicon.png');

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    webPreferences: {
      webSecurity: false,
    },
    fullscreen: true,
    icon: iconPath
  });

  powerSaveBlocker.start('prevent-display-sleep');

  // https://github.com/electron/electron/issues/14978
  mainWindow.webContents.on('did-fail-load', () => {
    console.log('did-fail-load');
    mainWindow.loadURL(getUrl());
    // REDIRECT TO FIRST WEBPAGE AGAIN
  });

  // and load the index.html of the app.
  mainWindow.loadURL(getUrl()).then(
    (success) => {
      // for some reason it thinks it has loaded the content, but it needs to reload it again, to actually show something, wtf?
      mainWindow.webContents.reload();
    },
    (reason) => console.log('fail', reason)
  );

  // mainWindow.webContents.openDevTools();

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  console.log('create window...');
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
