import {webFrame, ipcRenderer, shell} from 'electron';
import {getDictionaryPath} from 'common/utils/spellchecker';
import SpellChecker from 'spellchecker';

// Show an 'app updated' notification
ipcRenderer.on('notify-app-updated', function (event) {
  log('notifying app updated');

  // Display the notification
  const notif = new window.Notification(global.manifest.productName, {
    body: 'App updated to v' + global.manifest.version + '. Click to see changes.',
    tag: 'notify-app-updated',
    canReply: false
  });

  // Handle clicks
  notif.onclick = () => {
    setTimeout(() => {
      const changelogUrl = global.manifest.changelogUrl
        .replace(/%CURRENT_VERSION%/g, global.manifest.version);
      shell.openExternal(changelogUrl);
    }, 300);
  };
});

// Set spell checker
ipcRenderer.on('spell-checker', function (event, enabled, autoCorrect, langCode) {
  const chromiumLangCode = langCode.replace('_', '-');
  autoCorrect = !!autoCorrect;
  log('spell checker enabled:', enabled, 'auto correct:', autoCorrect, 'lang code:', langCode);

  if (enabled) {
    const dictionaryPath = getDictionaryPath(langCode);
    log('using', langCode, 'from', dictionaryPath || 'system', 'for spell checking');
    SpellChecker.setDictionary(langCode, dictionaryPath);
    webFrame.setSpellCheckProvider(chromiumLangCode, autoCorrect, {
      spellCheck: (text) => {
        return !SpellChecker.isMisspelled(text);
      }
    });
  } else {
    webFrame.setSpellCheckProvider(chromiumLangCode, autoCorrect, {
      spellCheck: () => {
        return true;
      }
    });
  }
});

// Insert the given theme css into the DOM
ipcRenderer.on('apply-theme', function (event, css) {
  let styleBlock = document.getElementById('cssTheme');

  if (!styleBlock) {
    styleBlock = document.createElement('style');
    styleBlock.id = 'cssTheme';
    styleBlock.type = 'text/css';
    document.head.appendChild(styleBlock);
  }

  styleBlock.innerHTML = css;
});

// Insert the webview css overrides into the DOM
ipcRenderer.on('apply-webview-css', function (event, css) {
  let styleBlock = document.getElementById('webviewCss');

  if (!styleBlock) {
    styleBlock = document.createElement('style');
    styleBlock.id = 'webviewCss';
    styleBlock.type = 'text/css';
    document.head.appendChild(styleBlock);
  }

  styleBlock.innerHTML = css;
});

// Insert or remove the style required to auto-hide the sidebar
ipcRenderer.on('apply-sidebar-auto-hide', function (event, enabled, css) {
  let styleBlock = document.getElementById('sidebarAutoHide');

  if (enabled && !styleBlock) {
    styleBlock = document.createElement('style');
    styleBlock.id = 'sidebarAutoHide';
    styleBlock.type = 'text/css';
    styleBlock.innerHTML = css;
    document.head.appendChild(styleBlock);
  }

  if (!enabled && styleBlock) {
    styleBlock.parentNode.removeChild(styleBlock);
  }
});

// Add the selected misspelling to the dictionary
ipcRenderer.on('add-selection-to-dictionary', function () {
  SpellChecker.add(document.getSelection().toString());
});

// Show the 'Settings' modal
// @source https://github.com/sindresorhus/caprine/blob/master/browser.js
ipcRenderer.on('open-preferences-modal', function (event, num) {
  log('opening Settings modal');

  // Click on the 'cog' icon
  const cogBtn = document.querySelector('._30yy._2fug._p');
  if (cogBtn) {
    cogBtn.click();
  }

  // Click on 'Settings'
  const nodes = document.querySelectorAll('._54nq._2i-c._558b._2n_z li:first-child a');
  if (nodes && nodes.length) {
    nodes[nodes.length - 1].click();
  }
});
