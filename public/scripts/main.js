import { initHeader } from './ui/header.js';
import { initMobileNav } from './ui/mobileNav.js';

console.log('Zutra: main.js loaded');

// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Zutra: DOMContentLoaded triggered');
    initHeader();
    initMobileNav();
});

// Re-initialize on Astro page transitions (if ViewTransitions are used)
document.addEventListener('astro:page-load', () => {
    console.log('Zutra: astro:page-load triggered');
    initHeader();
    initMobileNav();
});
