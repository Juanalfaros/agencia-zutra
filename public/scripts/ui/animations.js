// src/scripts/ui/animations.js

function initScrollSpy() {
  const nav = document.querySelector('.header__nav--desktop');
  if (!nav) return;

  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sectionMap = new Map(links.map(a => [a.getAttribute('href').substring(1), a]));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      links.forEach(a => {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      });
      const activeLink = sectionMap.get(id);
      if (activeLink) {
        activeLink.classList.add('active');
        activeLink.setAttribute('aria-current', 'page');
      }
    });
  }, { rootMargin: '-50% 0px -40% 0px', threshold: 0 });

  document.querySelectorAll('main section[id]').forEach(s => observer.observe(s));
}

function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -100px 0px' });
    
    revealElements.forEach(el => revealObserver.observe(el));
  }
}

export function initAnimations() {
  initScrollSpy();
  initRevealAnimations();
}