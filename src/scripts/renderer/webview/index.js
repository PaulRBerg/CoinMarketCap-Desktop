import {remote} from 'electron';
import path from 'path';
import prefs from 'browser/utils/prefs';

const webView = document.getElementById('wv');

// Fix preload requiring file:// protocol
let preloadPath = webView.getAttribute('preload');
preloadPath = 'file://' + path.join(remote.app.getAppPath(), 'html', preloadPath);
webView.setAttribute('preload', preloadPath);

// Set the user agent and load the app
const wvSrc = prefs.get('vwUrl');
log('loading', wvSrc);
webView.setAttribute('useragent', navigator.userAgent);
webView.setAttribute('src', wvSrc);

export default webView;

require('renderer/webview/events');
require('renderer/webview/listeners');
