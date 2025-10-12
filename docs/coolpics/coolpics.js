const menuButton = document.getElementById('menuButton');
const navList = document.getElementById('navList');
const BREAKPOINT = 1000;

function toggleMenu() {
  const nowHidden = navList.classList.toggle('hide');
  menuButton?.setAttribute('aria-expanded', String(!nowHidden));
}

function handleResize() {
  if (window.innerWidth >= BREAKPOINT) {
    navList.classList.remove('hide');
    menuButton?.setAttribute('aria-expanded', 'true');
  } else {
    navList.classList.add('hide');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
}

menuButton?.addEventListener('click', toggleMenu);
window.addEventListener('resize', handleResize);
handleResize();

const gallery = document.querySelector('.gallery');
const modal = document.createElement('dialog');
modal.id = 'viewer';
document.body.appendChild(modal);

modal.addEventListener('close', () => {
  document.body.classList.remove('no-scroll');
});
modal.addEventListener('cancel', (e) => {
  e.preventDefault();
  modal.close();
});
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.close();
});

function toFullSrc(smallSrc) {
  const parts = (smallSrc || '').split('-');
  return parts.length > 1 ? parts[0] + '-full.jpeg' : smallSrc;
}

function openViewer(src, alt) {
  modal.innerHTML = `
    <div class="viewer-box">
      <img class="viewer-img" src="${src}" alt="${alt}">
      <button class="close-viewer" aria-label="Close image viewer">X</button>
    </div>
  `;

  modal.querySelector('.close-viewer').addEventListener('click', () => modal.close());

  const img = modal.querySelector('.viewer-img');
  img.addEventListener('error', () => {
    console.warn('Viewer: failed to load image:', src);
    modal.close();
  });

  document.body.classList.add('no-scroll');
  if (!modal.open) modal.showModal();
}

if (gallery) {
  gallery.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;

    const smallSrc = img.getAttribute('src');
    const fullSrc = toFullSrc(smallSrc);
    const alt = img.getAttribute('alt') || 'Full-size image';
    openViewer(fullSrc, alt);
  });
}
