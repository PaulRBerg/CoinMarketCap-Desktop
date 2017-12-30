import {app, shell, dialog} from 'electron';

import * as piwik from 'browser/services/piwik';
import * as requestFilter from 'browser/utils/request-filter';
import filePaths from 'common/utils/file-paths';
import prefs from 'browser/utils/prefs';

/**
 * Call the handler for the check-for-update event.
 */
export function cfuCheckForUpdate (informUser) {
  return function () {
    global.application.autoUpdateManager.handleMenuCheckForUpdate(informUser);
  };
}

/**
 * Call the handler for the update-available event.
 */
export function cfuUpdateAvailable () {
  return function () {
    global.application.autoUpdateManager.handleMenuUpdateAvailable();
  };
}

/**
 * Call the handler for the update-downloaded event.
 */
export function cfuUpdateDownloaded () {
  return function () {
    global.application.autoUpdateManager.handleMenuUpdateDownloaded();
  };
}

/**
 * Reset the auto updater url (to use updated prefs).
 */
export function resetAutoUpdaterUrl () {
  return function () {
    global.application.autoUpdateManager.initFeedUrl();
  };
}

/**
 * Enable or disable automatic checks for update.
 */
export function checkForUpdateAuto (valueExpr) {
  return function () {
    const check = valueExpr.apply(this, arguments);
    global.application.autoUpdateManager.setAutoCheck(check);
  };
}

/**
 * Quit the app.
 */
export function appQuit () {
  return function () {
    app.quit();
  };
}

/**
 * Restart the app.
 */
export function restartApp () {
  return function () {
    app.relaunch();
    app.quit();
  };
}

/**
 * Open the url externally, in a browser.
 */
export function openUrl (url) {
  return function () {
    shell.openExternal(url);
  };
}

/**
 * Show a mac-like About dialog.
 */
export function showCustomAboutDialog () {
  return function () {
    dialog.showMessageBox({
      icon: filePaths.getImagePath('app_icon.png'),
      title: 'About ' + global.manifest.productName,
      message: global.manifest.productName + ' v' + global.manifest.version + '-' + global.manifest.versionChannel,
      detail: global.manifest.copyright + '\n\n' + 'This is just a wrapper for the official coinmarketcap.com, so it does not have an interface of its own.' + '\n\n' + 'We are not affiliated with the official website.'
    });
  };
}

/**
 * Send a message directly to the webview.
 */
export function sendToWebView (channel, ...valueExprs) {
  return function (menuItem, browserWindow) {
    if (!browserWindow) {
      browserWindow = global.application.mainWindowManager.window;
    }
    const values = valueExprs.map((e) => e.apply(this, arguments));
    browserWindow.webContents.send('fwd-webview', channel, ...values);
  };
}

/**
 * Send a message to the current BrowserWindow's WebContents.
 */
export function sendToWebContents (channel, ...valueExprs) {
  return function (menuItem, browserWindow) {
    if (!browserWindow) {
      browserWindow = global.application.mainWindowManager.window;
    }
    const values = valueExprs.map((e) => e.apply(this, arguments));
    browserWindow.webContents.send(channel, ...values);
  };
}

/**
 * Reload the browser window.
 */
export function reloadWindow () {
  return function (menuItem, browserWindow) {
    if (!browserWindow) {
      browserWindow = global.application.mainWindowManager.window;
    }
    browserWindow.webContents.reloadIgnoringCache();
  };
}

/**
 * Reset the window's position and size.
 */
export function resetWindow () {
  return function (menuItem, browserWindow) {
    if (!browserWindow) {
      browserWindow = global.application.mainWindowManager.window;
    }
    const bounds = prefs.getDefault('window-bounds');
    browserWindow.setSize(bounds.width, bounds.height, true);
    browserWindow.center();
  };
}

/**
 * Show (and focus) the window.
 */
export function showWindow () {
  return function (menuItem, browserWindow) {
    if (!browserWindow) {
      browserWindow = global.application.mainWindowManager.window;
    }
    if (browserWindow) {
      browserWindow.show();
    }
  };
}

/**
 * Toggle whether the window is in full screen or not.
 */
export function toggleFullScreen () {
  return function (menuItem, browserWindow) {
    if (!browserWindow) {
      browserWindow = global.application.mainWindowManager.window;
    }
    const newState = !browserWindow.isFullScreen();
    browserWindow.setFullScreen(newState);
  };
}

/**
 * Toggle the dev tools panel.
 */
export function toggleDevTools () {
  return function (menuItem, browserWindow) {
    if (!browserWindow) {
      browserWindow = global.application.mainWindowManager.window;
    }
    browserWindow.toggleDevTools();
  };
}

/**
 * Toggle the webview's dev tools panel.
 */
export function toggleWebViewDevTools () {
  return function (menuItem, browserWindow) {
    if (!browserWindow) {
      browserWindow = global.application.mainWindowManager.window;
    }
    browserWindow.webContents.send('toggle-wv-dev-tools');
  };
}

/**
 * Whether the menu bar should hide automatically.
 */
export function autoHideMenuBar (autoHideExpr) {
  return function (menuItem, browserWindow) {
    if (!browserWindow) {
      browserWindow = global.application.mainWindowManager.window;
    }
    const autoHide = autoHideExpr.apply(this, arguments);
    browserWindow.setAutoHideMenuBar(autoHide);
  };
}

/**
 * Whether the window should always appear on top.
 */
export function floatOnTop (flagExpr) {
  return function (menuItem, browserWindow) {
    if (!browserWindow) {
      browserWindow = global.application.mainWindowManager.window;
    }
    const flag = flagExpr.apply(this, arguments);
    browserWindow.setAlwaysOnTop(flag);
  };
}

/**
 * Show or hide the tray icon.
 */
export function showInTray (flagExpr) {
  return function () {
    const show = flagExpr.apply(this, arguments);
    if (show) {
      global.application.trayManager.create();
    } else {
      global.application.trayManager.destroy();
    }
  };
}

/**
 * Show or hide the dock icon.
 */
export function showInDock (flagExpr) {
  return function () {
    if (app.dock && app.dock.show && app.dock.hide) {
      const show = flagExpr.apply(this, arguments);
      if (show) {
        app.dock.show();
      } else {
        app.dock.hide();
      }
    }
  };
}

/**
 * Whether the app should launch automatically when the OS starts.
 */
export function launchOnStartup (enabledExpr) {
  return function () {
    const enabled = enabledExpr.apply(this, arguments);
    if (enabled) {
      global.application.autoLauncher.enable()
        .then(() => log('auto launcher enabled'))
        .catch((err) => {
          log('could not enable auto-launcher');
          logError(err, true);
        });
    } else {
      global.application.autoLauncher.disable()
        .then(() => log('auto launcher disabled'))
        .catch((err) => {
          log('could not disable auto-launcher');
          logError(err, true);
        });
    }
  };
}

/**
 * If flag is false, the dock badge will be hidden.
 */
export function hideDockBadge (flagExpr) {
  return function () {
    const flag = flagExpr.apply(this, arguments);
    if (!flag) {
      app.setBadgeCount(0);
    }
  };
}

/**
 * If flag is false, the taskbar badge will be hidden.
 */
export function hideTaskbarBadge (flagExpr) {
  return function (menuItem, browserWindow) {
    if (!browserWindow) {
      browserWindow = global.application.mainWindowManager.window;
    }
    const flag = flagExpr.apply(this, arguments);
    if (!flag) {
      browserWindow.setOverlayIcon(null, '');
    }
  };
}

/**
 * Whether the user should appear as online and 'is typing' indicators be sent.
 */
export function blockSeenTyping (flagExpr) {
  return function (menuItem, browserWindow) {
    const shouldBlock = flagExpr.apply(this, arguments);
    requestFilter.set(shouldBlock, browserWindow.webContents.session);
  };
}

// Analytics
export const analytics = {

  /**
   * Track an event.
   */
  trackEvent: (...args) => {
    return function (menuItem, browserWindow) {
      const tracker = piwik.getTracker();
      if (tracker) {
        tracker.trackEvent(...args);
      }
    };
  }

};

/**
 * Restart the app in debug mode.
 */
export function restartInDebugMode () {
  return function () {
    const options = {
      // without --no-console-logs, calls to console.log et al. trigger EBADF errors in the new process
      args: [...process.argv.slice(1), '--debug', '--no-console-logs']
    };

    log('relaunching app', JSON.stringify(options));
    app.relaunch(options);
    app.exit(0);
  };
}

/**
 * Open the log file for easier debugging.
 */
export function openDebugLog () {
  return function () {
    if (global.__debug_file_log_path) {
      log('opening log file with default app', global.__debug_file_log_path);
      shell.openItem(global.__debug_file_log_path);
    } else {
      logError(new Error('global.__debug_file_log_path was falsy'));
    }
  };
}
