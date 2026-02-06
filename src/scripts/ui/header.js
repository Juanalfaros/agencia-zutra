// src/scripts/ui/header.js

function initHeaderScroll() {
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run once on init
  }
}

export function initHeader() {
  initHeaderScroll();
}