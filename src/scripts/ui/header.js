// src/scripts/ui/header.js

function initHeaderShadow() {
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}

function initMiniCta() {
  const container = document.getElementById('header-cta-container');
  const mainCta = document.getElementById('cta-header-main');
  if (!container || !mainCta) return;

  let miniCta = document.getElementById('cta-header-mini');
  if (!miniCta) {
    miniCta = document.createElement('a');
    miniCta.id = 'cta-header-mini';
    miniCta.href = '#contacto';
    miniCta.textContent = 'Auditoría';
    miniCta.setAttribute('data-track', 'cta_header_mini');
    miniCta.classList.add('button', 'button--primary', 'button--mini', 'hidden');
    container.appendChild(miniCta);
  }

  const toggle = () => {
    const scrolled = window.scrollY >= 200;
    mainCta.classList.toggle('hidden', scrolled);
    miniCta.classList.toggle('hidden', !scrolled);
  };

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
}

export function initHeader() {
  initHeaderShadow();
  initMiniCta();
}