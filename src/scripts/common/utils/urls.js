/**
 * Check if the given url is a downloadable file. Currently only detects Facebook CDN urls.
 */
function isDownloadUrl (urlLink) {
  const isDlUrl = urlLink.startsWith('https://cdn.fbsbx.com') && urlLink.endsWith('&dl=1');
  log('link is download url', urlLink, isDlUrl);
  return isDlUrl;
}

export default {
  isDownloadUrl
};
