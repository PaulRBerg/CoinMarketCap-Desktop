import {remote} from 'electron';
import Mousetrap from 'mousetrap';

import prefs from 'common/utils/prefs';

log('binding keyboard shortcuts');

// Close with Esc
Mousetrap.bind('esc', function () {
  const enabled = prefs.get('close-with-esc');
  log('close with esc shortcut, enabled:', enabled);
  if (enabled) {
    const mwm = remote.getGlobal('application').mainWindowManager;
    if (mwm) {
      mwm.window.close();
    }
  }
  return enabled;
});
