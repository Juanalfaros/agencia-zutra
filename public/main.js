// src/scripts/main.js

import { toast } from './utils/toast.js';
import { initContactForm } from './forms/contactForm.js';
import { initAnimations } from './ui/animations.js';
import { initCarousel } from './ui/carousel.js';
import { initHeader } from './ui/header.js';
import { initMobileNav } from './ui/mobileNav.js';
import { initTabs } from './ui/tabs.js';
import { updateFooterYear } from './utils/footerYear.js';
import { setRandomTheme } from './utils/theme.js';

const init = () => {
  // Inicializa todos los módulos
  setRandomTheme();
  initMobileNav();
  initHeader();
  initAnimations();
  updateFooterYear();
  initTabs();
  initContactForm();
  initCarousel();
};

// Safe initialization for modules
const safeInit = () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
};

safeInit();
document.addEventListener('astro:page-load', init);