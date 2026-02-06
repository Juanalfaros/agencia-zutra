// src/scripts/ui/mobileNav.js

export function initMobileNav() {
  const menuBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('menu-close-btn');
  const mobileNav = document.getElementById('m-nav');
  const overlay = mobileNav?.querySelector('.mobile-menu__overlay');
  const body = document.body;

  if (menuBtn && mobileNav) {
    const openMenu = () => {
      mobileNav.classList.add('active');
      body.classList.add('menu-open');
      menuBtn.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
      mobileNav.classList.remove('active');
      body.classList.remove('menu-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    };

    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) closeMenu();
      else openMenu();
    });

    closeBtn?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);

    // Cerrar menú al hacer clic en enlaces
    const links = mobileNav.querySelectorAll('.mobile-menu__link');
    links.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
}