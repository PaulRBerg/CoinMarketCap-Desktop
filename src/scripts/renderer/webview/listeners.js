import {shell, remote} from 'electron';

import webView from 'renderer/webview';
import platform from 'common/utils/platform';
import graphics from 'common/utils/graphics';
import prefs from 'common/utils/prefs';
import urls from 'common/utils/urls';

// Log console messages
webView.addEventListener('console-message', function (event) {
  const msg = event.message.replace(/%c/g, '');
  console.log('WV: ' + msg);
  log('WV:', msg);
});

// Listen for title changes to update the badge
let _delayedRemoveBadge = null;
webView.addEventListener('page-title-updated', function () {
  log('webview page-title-updated');
  const matches = /\(([\d]+)\)/.exec(webView.getTitle());
  const parsed = parseInt(matches && matches[1], 10);
  const count = isNaN(parsed) || !parsed ? '' : '' + parsed;
  let badgeDataUrl = null;

  if (platform.isWindows && count) {
    badgeDataUrl = graphics.createBadgeDataUrl(count);
  }

  log('notifying window of notif-count', count, !!badgeDataUrl || null);
  clearTimeout(_delayedRemoveBadge);

  // clear badge either instantly or after delay
  _delayedRemoveBadge = setTimeout(() => {
    const mwm = remote.getGlobal('application').mainWindowManager;
    if (mwm && typeof mwm.notifCountChanged === 'function') {
      mwm.notifCountChanged(count, badgeDataUrl);
    }
  }, count ? 0 : 1500);
});

// Handle url clicks
webView.addEventListener('new-window', function (event) {
  log('webview new-window', JSON.stringify(event));
  const url = event.url;
  event.preventDefault();

  // download url
  if (urls.isDownloadUrl(url)) {
    log('on webview new-window, downloading', url);
    webView.getWebContents().loadURL(url);
    return;
  }

  // open it externally (if preference is set)
  if (prefs.get('links-in-browser')) {
    log('on webview new-window, externally', url);
    shell.openExternal(url);
    return;
  }

  // otherwise open it in a new app window (unless it's an audio/video call)
  if (event.frameName !== 'Video Call' || event.url !== 'about:blank') {
    const options = {
      title: event.frameName || global.manifest.productName,
      darkTheme: global.manifest.darkThemes.includes(prefs.get('theme'))
    };
    log('on webview new-window, new window', url, options);
    const newWindow = new remote.BrowserWindow(options);
    newWindow.loadURL(url);
    event.newGuest = newWindow;
  }
});

// Listen for dom-ready
webView.addEventListener('dom-ready', function () {
  log('webview dom-ready');

  // Open dev tools when debugging
  const autoLaunchDevTools = window.localStorage.autoLaunchDevTools;
  if (autoLaunchDevTools && JSON.parse(autoLaunchDevTools)) {
    webView.openDevTools();
  }

  // Restore the zoom level
  const zoomLevel = prefs.get('zoom-level');
  if (zoomLevel) {
    log('restoring zoom level', zoomLevel);
    webView.setZoomLevel(zoomLevel);
  }

  // Restore spell checker and auto correct
  const spellCheckerCheck = prefs.get('spell-checker-check');
  if (spellCheckerCheck) {
    const autoCorrect = prefs.get('spell-checker-auto-correct');
    const langCode = prefs.get('spell-checker-language');
    log('restoring spell checker', spellCheckerCheck, 'auto correct', autoCorrect, 'lang code', langCode);
    webView.send('spell-checker', spellCheckerCheck, autoCorrect, langCode);
  }

  // Show an 'app updated' notification
  if (prefs.get('notify-app-updated')) {
    webView.send('notify-app-updated');
    prefs.set('notify-app-updated', false);
  }
});

// Listen for did-finish-load
webView.addEventListener('did-finish-load', function () {
  log('webview did-finish-load');

  // Hide the loading splash screen
  const loadingSplashDiv = document.querySelector('.loader');
  loadingSplashDiv.style.opacity = 0;
  setTimeout(function () {
    loadingSplashDiv.style.display = 'none';
  }, 250);
});

webView.addEventListener('did-fail-load', function () {
  log('webview did-fail-load');

  // Hide the loading splash screen
  const loadingSplashDiv = document.querySelector('.loader');
  loadingSplashDiv.style.opacity = 0;
  const noInternetDiv = document.querySelector('.nointernet');
  noInternetDiv.style.opacity = 1;
  setTimeout(function () {
    loadingSplashDiv.style.display = 'none';
    noInternetDiv.style.display = 'flex';
  }, 250);
});


// Forward context menu opens
webView.addEventListener('context-menu', function (event) {
  const paramDefaults = {
    isWindows7: platform.isWindows7
  };
  const params = JSON.stringify(Object.assign(paramDefaults, event.params));
  log('sending context menu', params);
  const mwm = remote.getGlobal('application').mainWindowManager;
  if (mwm) {
    mwm.openContextMenu(params);
  }
  event.preventDefault();
});

// Animate the splash screen into view
document.addEventListener('DOMContentLoaded', function () {
  log('document DOMContentLoaded');

  // Show the loading splash screen
  const loadingSplashDiv = document.querySelector('.loader');
  loadingSplashDiv.style.opacity = 1;

  // In case did-finish-load isn't called, set a timeout
  setTimeout(function () {
    loadingSplashDiv.style.opacity = 0;
    setTimeout(function () {
      loadingSplashDiv.style.display = 'none';
    }, 250);
  }, 10 * 1000);
});

export default webView;
