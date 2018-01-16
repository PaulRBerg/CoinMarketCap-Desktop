import platform from 'common/utils/platform';
import $ from 'browser/menus/expressions';

export default {
  label: '&View',
  submenu: [{
    label: 'Zoom In',
    accelerator: 'CmdOrCtrl+plus',
    needsWindow: true,
    click: $.all(
      $.setPref('zoom-level', $.sum($.pref('zoom-level'), $.val(+0.25))),
      $.sendToWebContents('zoom-level', $.pref('zoom-level'))
    )
  }, {
    label: 'Zoom Out',
    accelerator: 'CmdOrCtrl+-',
    needsWindow: true,
    click: $.all(
      $.setPref('zoom-level', $.sum($.pref('zoom-level'), $.val(-0.25))),
      $.sendToWebContents('zoom-level', $.pref('zoom-level'))
    )
  }, {
    label: 'Reset Zoom',
    accelerator: 'CmdOrCtrl+0',
    needsWindow: true,
    click: $.all(
      $.sendToWebContents('zoom-level', $.val(0)),
      $.unsetPref('zoom-level')
    )
  }, {
    type: 'separator'
  }, {
    needsWindow: true,
    role: 'togglefullscreen'
  }, {
    label: 'Toggle &Developer Tools',
    needsWindow: true,
    accelerator: 'Alt+CmdOrCtrl+I',
    click: $.toggleDevTools()
  }, {
    label: 'Toggle WebView &Dev Tools',
    needsWindow: true,
    click: $.toggleWebViewDevTools()
  }, {
    type: 'separator'
  }, {
    type: 'checkbox',
    label: 'Auto Hide &Menu Bar',
    accelerator: 'Alt+Ctrl+B',
    needsWindow: true,
    allow: platform.isNonDarwin,
    click: $.all(
      $.setPref('auto-hide-menubar', $.key('checked')),
      $.autoHideMenuBar($.key('checked'))
    ),
    parse: $.all(
      $.setLocal('checked', $.pref('auto-hide-menubar'))
    )
  }]
};
