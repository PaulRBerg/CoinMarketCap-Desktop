/**
 * URL match patterns to be filteresd.
 * @see https://developer.chrome.com/extensions/match_patterns
 */
const URL_PATTERNS = [
  '*://*.coinmarketcap.com'
];

/**
 * Enable request cancelling of urls matched by pattern list.
 */
export function enable (targetSession) {
  targetSession.webRequest.onBeforeRequest({urls: URL_PATTERNS}, (details, callback) => {
    log('request filter', 'blocked', details.url);
    callback({cancel: true}); // eslint-disable-line standard/no-callback-literal
  });
  log('request filter', 'enabled', URL_PATTERNS.length, 'entries');
}

/**
 * Disable request cancelling of urls matched by pattern list.
 */
export function disable (targetSession) {
  targetSession.webRequest.onBeforeRequest({urls: URL_PATTERNS}, null);
  log('request filter', 'disabled');
}

/**
 * Setter convenience interface.
 */
export function set (shouldEnable, targetSession) {
  if (shouldEnable) {
    enable(targetSession);
  } else {
    disable(targetSession);
  }
}
