// src/scripts/main.js

import { initContactForm } from './forms/contactForm.js';
import { initAnimations } from './ui/animations.js';
import { initCarousel } from './ui/carousel.js';
import { initHeader } from './ui/header.js';
import { initMobileNav } from './ui/mobileNav.js';
import { initTabs } from './ui/tabs.js';
import { updateFooterYear } from './utils/footerYear.js';
import { setRandomTheme } from './utils/theme.js';

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa todos los módulos
  setRandomTheme();
  initMobileNav();
  initHeader();
  initAnimations();
  updateFooterYear();
  initTabs();
  initContactForm();
  initCarousel();
});