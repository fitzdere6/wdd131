const menuButton = document.getElementById('menuButton');
const primaryNav = document.getElementById('primaryNav');

if (menuButton && primaryNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  primaryNav.addEventListener('click', (evt) => {
    const link = evt.target.closest('a');
    if (link && primaryNav.classList.contains('open')) {
      primaryNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
}
