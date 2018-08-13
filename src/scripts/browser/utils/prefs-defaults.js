import {app} from 'electron';

import {getAvailableDictionaries} from 'common/utils/spellchecker';
import platform from 'common/utils/platform';

let availableLanguages = null;
const defaults = {
  'accept-first-mouse': false,
  'analytics-track': true,
  'analytics-uid': null,
  'auto-hide-menubar': false,
  'close-with-esc': false,
  'launch-startup': false,
  'launch-startup-hidden': true,
  'launch-quit': false,
  'links-in-browser': true,
  'quit-behaviour-taught': false,
  'notify-app-updated': false,
  'show-notifications-badge': true,
  'show-tray': platform.isWindows,
  'show-dock': true,
  'sidebar-auto-hide': false,
  'spell-checker-check': false,
  'spell-checker-auto-correct': false,
  'spell-checker-language': defaultSpellCheckerLanguage,
  'updates-auto-check': true,
  'updates-channel': global.manifest.versionChannel,
  'vwUrl': 'https://coinmarketcap.com',
  'window-bounds': {
    width: 1280,
    height: 800
  },
  'window-popup-bounds': {
    width: 480,
    height: 360
  },
  'window-full-screen': false,
  'zoom-level': 0
};

function get (key) {
  if (key === 'spell-checker-language') {
    const valueFn = defaults[key];
    if (typeof valueFn === 'function') {
      if (global.ready) {
        defaults[key] = valueFn();
        return defaults[key];
      } else {
        return valueFn();
      }
    }
  }

  return defaults[key];
}

function defaultSpellCheckerLanguage () {
  let defaultLanguage = null;

  if (!availableLanguages) {
    availableLanguages = getAvailableDictionaries();
  }

  // Try to get it from app
  if (global.ready) {
    defaultLanguage = app.getLocale();
    if (typeof defaultLanguage === 'string') {
      defaultLanguage = defaultLanguage.replace('-', '_');
      defaultLanguage = validateLanguage(defaultLanguage);
      if (defaultLanguage) {
        return defaultLanguage;
      }
    }
    defaultLanguage = null;
  }

  // Try to get it from env
  if (typeof process.env.LANG === 'string') {
    defaultLanguage = process.env.LANG.split('.')[0];
    defaultLanguage = defaultLanguage.replace('-', '_');
    defaultLanguage = validateLanguage(defaultLanguage);
    if (defaultLanguage) {
      return defaultLanguage;
    }
    defaultLanguage = null;
  }

  // Try to use en
  const langEn = validateLanguage('en');
  if (langEn) {
    return langEn;
  }

  // Try to use en-us
  const langEnUs = validateLanguage('en_US');
  if (langEnUs) {
    return langEnUs;
  }

  // Try to use the first available language
  if (availableLanguages.length) {
    return availableLanguages[0];
  }

  // Use the default
  return 'en_US';
}

function validateLanguage (lang) {
  if (availableLanguages.includes(lang)) {
    return lang;
  } else {
    lang = lang.split('_')[0];
    if (availableLanguages.includes(lang)) {
      return lang;
    }
  }
  return null;
}

export default {
  get
};
