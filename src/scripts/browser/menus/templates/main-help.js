import $ from 'browser/menus/expressions';

export default {
  label: '&Help',
  role: 'help',
  submenu: [{
    label: 'Open App Website',
    click: $.openUrl('https://coinmarketcapdesktop.com')
  }, {
    label: 'Send Feedback',
    click: $.openUrl('https://paulrberg.typeform.com/to/FFI5Hl')
  }]
};
