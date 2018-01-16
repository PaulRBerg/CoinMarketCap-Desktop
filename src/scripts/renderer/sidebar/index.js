import {remote, dialog, ipcRenderer} from 'electron';
import path from 'path';
import url from 'url';

import prefs from 'browser/utils/prefs';
import filePaths from 'common/utils/file-paths';

// On click listeners
document.querySelector('#refresh').addEventListener('click', (e) => {
  reload();
});

function reload () {
  remote.getCurrentWindow().webContents.reloadIgnoringCache();
}

document.querySelector('#providers').addEventListener('click', (e) => {
  createProvidersWindow();
});

function createProvidersWindow () {
  console.log('wtf');
  const bounds = prefs.get('window-popup-bounds');
  let rootWindow = remote.getCurrentWindow();

  // Spawn window
  let providersWindow = new remote.BrowserWindow({
    parent: rootWindow,
    width: bounds.width,
    height: bounds.height,
    modal: true
  });
  // Listen for events
  providersWindow.on('closed', () => {});
  ipcRenderer.on('message', (event, message) => {
    console.log(message);
  });

  // Load url
  providersWindow.loadURL(url.format({
    pathname: path.join(__dirname, '..', '..', '..', 'html', 'alerts', 'providers.html'),
    protocol: 'file:'
  }));

  // Gracefully show the child
  providersWindow.once('ready-to-show', () => {
    rootWindow.show(providersWindow);
  });

  setTimeout(() => {
    providersWindow.close();
  }, 12000);
}

document.querySelector('#notifications').addEventListener('click', (e) => {
  createNotificationsWindow();
});

function createNotificationsWindow () {
  dialog.showMessageBox({
    icon: filePaths.getImagePath('app_icon.png'),
    title: 'Notifications Coming Soon',
    message: 'Stay tuned on Github for version 2.0.0: \n\n ' + global.manifest.repository.url.replace('.git', '')
  });
}