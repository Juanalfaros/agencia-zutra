// src/scripts/ui/mobileNav.js

export function initMobileNav() {
  const menuBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('menu-close-btn');
  const mobileNav = document.getElementById('m-nav');
  const overlay = mobileNav?.querySelector('.mobile-menu__overlay');
  const body = document.body;

  if (menuBtn && mobileNav) {
    console.log('Mobile Nav initialized');

    // Prevent duplicate listeners if script runs multiple times
    if (menuBtn.dataset.listenerAttached) return;
    menuBtn.dataset.listenerAttached = 'true';

    const openMenu = () => {
      console.log('Mobile menu opened');
      mobileNav.classList.add('active');
      body.classList.add('menu-open');
      menuBtn.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
      console.log('Mobile menu closed');
      mobileNav.classList.remove('active');
      body.classList.remove('menu-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    };

    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    closeBtn?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);

    // Cerrar menú al hacer clic en enlaces
    const links = mobileNav.querySelectorAll('.mobile-menu__link');
    links.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  } else {
    console.warn('Mobile Nav elements not found:', { menuBtn: !!menuBtn, mobileNav: !!mobileNav });
  }
}