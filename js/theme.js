/* Noor theme selector: Light, Midnight Emerald and Royal Purple. */
(() => {
  const storageKey = 'noor-theme';
  const root = document.documentElement;
  const trigger = document.getElementById('themeToggle');
  const menu = document.getElementById('themePickerMenu');
  if (!trigger || !menu) return;

  const validThemes = new Set(['light', 'dark', 'royal']);
  let saved = 'light';
  try {
    const stored = localStorage.getItem(storageKey);
    if (validThemes.has(stored)) saved = stored;
  } catch (_) {}

  const closeMenu = () => {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  };
  const applyTheme = (theme) => {
    if (!validThemes.has(theme)) return;
    root.dataset.theme = theme;
    document.body.classList.toggle('dark-mode', theme !== 'light');
    trigger.setAttribute('aria-label', 'Switch Theme');
    trigger.setAttribute('title', 'Switch Theme');
    const icon = trigger.querySelector('.theme-toggle-icon');
    if (icon) icon.textContent = theme === 'light' ? '☾' : theme === 'dark' ? '☀' : '♛';
    menu.querySelectorAll('[data-theme-choice]').forEach(option => {
      const selected = option.dataset.themeChoice === theme;
      option.setAttribute('aria-checked', String(selected));
    });
    try { localStorage.setItem(storageKey, theme); } catch (_) {}
  };

  applyTheme(saved);
  trigger.addEventListener('click', () => {
    const opening = menu.hidden;
    menu.hidden = !opening;
    trigger.setAttribute('aria-expanded', String(opening));
  });
  menu.addEventListener('click', event => {
    const option = event.target.closest('[data-theme-choice]');
    if (!option) return;
    applyTheme(option.dataset.themeChoice);
    closeMenu();
    trigger.focus();
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.theme-picker-wrap')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) { closeMenu(); trigger.focus(); }
  });
})();
