// src/scripts/ui/mobileNav.js

export function initMobileNav() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('m-nav');
  
  if (menuBtn && mobileNav) {
    const toggleNav = () => {
      const willOpen = !mobileNav.classList.contains('active');
      mobileNav.classList.toggle('active');
      mobileNav.setAttribute('aria-hidden', String(!willOpen));
      menuBtn.setAttribute('aria-expanded', String(willOpen));
      menuBtn.setAttribute('aria-label', willOpen ? 'Cerrar menú' : 'Abrir menú');
      
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.className = willOpen ? 'ph-bold ph-x' : 'ph-bold ph-list';
      }
      document.body.style.overflow = willOpen ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', toggleNav);
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', toggleNav));
  }
}