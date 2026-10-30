/* Step 26 — shared smooth loading and content-entry behavior for all Noor sections. */
(() => {
  'use strict';
  if (window.__noorStep26SmoothNavigation) return;
  window.__noorStep26SmoothNavigation = true;

  const loader = document.createElement('div');
  loader.id = 'noorNavigationLoader';
  loader.setAttribute('role', 'status');
  loader.setAttribute('aria-live', 'polite');
  loader.setAttribute('aria-label', 'Loading page');
  loader.innerHTML = '<div class="noor-loader-card"><div class="noor-loader-mark">noor<span>.</span></div><div class="noor-loader-spinner" aria-hidden="true"></div><div class="noor-loader-label">Loading gently</div></div>';
  document.body.appendChild(loader);

  let showTimer = 0;
  let hideTimer = 0;
  let pending = false;
  let shownAt = 0;
  const minimumVisibleMs = 260;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function showLoader() {
    if (reducedMotion.matches) return;
    pending = true;
    window.clearTimeout(showTimer);
    window.clearTimeout(hideTimer);
    // Navigation is an intentional page transition: show Noor immediately.
    if (!loader.classList.contains('is-visible')) shownAt = Date.now();
    loader.classList.add('is-visible');
  }
  function finishNavigation() {
    window.clearTimeout(showTimer);
    window.clearTimeout(hideTimer);
    const remaining = loader.classList.contains('is-visible') ? Math.max(0, minimumVisibleMs - (Date.now() - shownAt)) : 0;
    hideTimer = window.setTimeout(() => { pending = false; loader.classList.remove('is-visible'); }, remaining);
  }
  window.noorNavigationLoader = { show: showLoader, finish: finishNavigation };

  function isNavigationTarget(target) {
    if (!(target instanceof Element)) return false;
    const control = target.closest('a[href], button, [role="button"], [role="link"], [data-action], [data-collection], [data-hadith-book], .hadith-collection-card, .collection-card, .hadith-book-card');
    if (!control) return false;
    if (control.matches('a[href^="#"]')) return true;
    if (control.matches('[data-surah], [data-next], [data-previous], [data-next-surah], [data-prev-surah], [data-go-home], #backToSurahs, #tafsirBackToLibrary, #tafsirLoadBack, [data-tafsir-back], [data-collection], [data-hadith-book], .hadith-collection-card, .collection-card, .hadith-book-card')) return true;

    const label = `${control.getAttribute('aria-label') || ''} ${control.getAttribute('title') || ''} ${control.textContent || ''}`.replace(/\s+/g, ' ').trim();
    // Quran previous/next controls may contain decorative text or icons before
    // their labels, so match the phrase anywhere rather than anchoring at start.
    if (/\b(previous|prev|next)\s+surah\b/i.test(label)) return true;
    if (/^(next|previous|prev|back|home|all\s+surahs|open surah|read surah)\b/i.test(label)) return true;

    // Hadith collection cards are rendered by more than one view. Detect a
    // collection/book choice only while inside the Hadith library/list view.
    const inHadithLibrary = !!control.closest('#hadithView, #hadithLibrary, .hadith-library, [data-section="hadith"], .hadith-section');
    if (inHadithLibrary && /\b(bukhari|muslim|abu dawud|abudawud|tirmidhi|nasai|nasa'i|ibn majah|muwatta|collection|all hadiths|back to library)\b/i.test(label)) return true;
    return false;
  }

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!isNavigationTarget(event.target)) return;
    showLoader();
    // Data-driven views finish explicitly; this fallback prevents a permanently stuck veil.
    window.clearTimeout(window.__noorLoaderFallback);
    window.__noorLoaderFallback = window.setTimeout(finishNavigation, 650);
  }, true);

  // Animate newly-rendered views/cards across Quran, Hadith, Tafseer and every other section.
  const animatedSelectors = [
    '#homeView', '#sectionView', '.section-page', '.surah-reader-hero', '#ayahList',
    '.hadith-entry', '.step4-panel', '.section-tile-grid', '.story-card', '.duas-card',
    '.names-grid', '.learning-card', '.tool-card'
  ].join(',');
  const animated = new WeakSet();
  function animateInsertedContent(root) {
    if (!(root instanceof Element)) return;
    const candidates = [];
    if (root.matches(animatedSelectors)) candidates.push(root);
    candidates.push(...root.querySelectorAll(animatedSelectors));
    candidates.forEach(element => {
      if (animated.has(element)) return;
      animated.add(element);
      element.classList.remove('noor-content-enter', 'noor-view-enter');
      // Force a single reflow so repeated visits replay the entry animation consistently.
      void element.offsetWidth;
      element.classList.add(element.matches('#homeView, #sectionView') ? 'noor-view-enter' : 'noor-content-enter');
      element.addEventListener('animationend', () => {
        element.classList.remove('noor-content-enter', 'noor-view-enter');
      }, { once: true });
    });
  }

  const observer = new MutationObserver(records => {
    let changed = false;
    for (const record of records) {
      if (record.type === 'childList') {
        record.addedNodes.forEach(node => { if (node instanceof Element) animateInsertedContent(node); });
        if (record.addedNodes.length || record.removedNodes.length) changed = true;
      }
    }
    // Do not hide here: section DOM can update before its data has finished loading.
  });
  observer.observe(document.body, { childList: true, subtree: true });
  animateInsertedContent(document.body);
  // First paint: show the branded loader briefly, then reveal the home view.
  showLoader();
  window.setTimeout(finishNavigation, 300);

  // Hash/back navigation must always finish; previously these listeners only
  // showed the loader and could leave it visible until the 12-second fallback.
  function handleHistoryNavigation() {
    showLoader();
    window.clearTimeout(window.__noorLoaderFallback);
    window.__noorLoaderFallback = window.setTimeout(finishNavigation, 300);
  }
  window.addEventListener('pageshow', finishNavigation);
  window.addEventListener('popstate', handleHistoryNavigation);
  window.addEventListener('hashchange', handleHistoryNavigation);
})();
