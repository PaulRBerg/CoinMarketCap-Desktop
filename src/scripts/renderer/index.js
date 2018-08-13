const appPath = require('electron').remote.app.getAppPath();
const initPath = require('path').join(appPath, 'scripts', 'renderer', 'init.js');
require(initPath).inject('renderer');

require('renderer/webview');
require('renderer/sidebar');
require('renderer/components/keymap');
