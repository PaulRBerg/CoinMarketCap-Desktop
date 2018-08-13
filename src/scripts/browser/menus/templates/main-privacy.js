import $ from 'browser/menus/expressions';

export default {
  label: 'Privacy',
  submenu: [{
    type: 'checkbox',
    label: '&Report App Stats and Crashes',
    click: $.setPref('analytics-track', $.key('checked')),
    parse: $.setLocal('checked', $.pref('analytics-track'))
  }]
};
