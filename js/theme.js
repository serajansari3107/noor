/* Noor theme switch: persistent Midnight Emerald & Gold dark theme. */
(() => {
  const storageKey = 'noor-theme';
  const root = document.documentElement;
  const button = document.getElementById('themeToggle');
  if (!button) return;

  let savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light';
  } catch (_) { /* Storage can be unavailable in private/restricted contexts. */ }

  const applyTheme = (theme) => {
    const dark = theme === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    document.body.classList.toggle('dark-mode', dark);
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    button.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
    const icon = button.querySelector('.theme-toggle-icon');
    if (icon) icon.textContent = dark ? '☀' : '☾';
  };

  applyTheme(savedTheme);
  button.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try { localStorage.setItem(storageKey, nextTheme); } catch (_) { /* Theme still works for this page view. */ }
  });
})();
