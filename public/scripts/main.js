import { initHeader } from './ui/header.js';
import { initMobileNav } from './ui/mobileNav.js';

// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileNav();
});

// Re-initialize on Astro page transitions (if ViewTransitions are used)
document.addEventListener('astro:page-load', () => {
    initHeader();
    initMobileNav();
});
