/* No analytics SDK or network request is loaded by CONNECT.
 * This integration seam stays closed until central profile/event onboarding.
 * A future adapter must re-read authoritative consent on every call, honor
 * withdrawal, and accept only these fixed aliases (never URL/query/referrer).
 */
(function (root) {
  'use strict';
  const adapter = root.PeakheadzConnectAnalytics;
  const allowed = new Set(['connect_page_view','connect_social_click','connect_project_click','connect_featured_click','connect_coming_soon_click']);
  function send(name, params) {
    try {
      if (root.location.origin !== 'https://peakheadz.com' || root.navigator.globalPrivacyControl === true || root.navigator.doNotTrack === '1') return;
      if (!adapter || adapter.enabled !== true || adapter.contractVersion !== 'connect-v1' || adapter.hasConsent() !== true || !allowed.has(name)) return;
      adapter.track(name, params);
    } catch (_) { /* Navigation must remain usable when analytics is unavailable. */ }
  }
  send('connect_page_view', {placement:'connect'});
  root.document.addEventListener('click', function (event) {
    const link = event.target.closest('a[data-connect-link]');
    if (!link) return;
    const d = link.dataset;
    const events = {follow:'connect_social_click',featured:'connect_featured_click',projects:'connect_project_click',coming_next:'connect_coming_soon_click'};
    send(events[d.placement], {link_id:d.linkId,brand:d.brand,platform:d.platform,category:d.category,destination_id:d.destinationId,placement:d.placement});
  });
})(window);
