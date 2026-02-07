// src/scripts/ui/header.js

let headerScrollListener = null;

function initHeaderScroll() {
  const header = document.getElementById('header');
  if (header) {
    // Remove previous listener to avoid duplicates and stale references
    if (headerScrollListener) {
      window.removeEventListener('scroll', headerScrollListener);
    }

    headerScrollListener = () => {
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 20);
      }
    };

    window.addEventListener('scroll', headerScrollListener, { passive: true });
    headerScrollListener(); // Run once on init
  }
}

export function initHeader() {
  initHeaderScroll();
}