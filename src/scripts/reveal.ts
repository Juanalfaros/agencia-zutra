/**
 * Reveal Animation Script
 * 
 * Adds the 'show' class to elements with the 'reveal' class
 * when they enter the viewport using IntersectionObserver.
 */

function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');

    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    // Optional: unobserve after revealing to improve performance
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1, // Trigger when 10% of the element is visible
            rootMargin: '0px 0px -50px 0px', // Trigger slightly before element enters viewport
        }
    );

    revealElements.forEach((el) => observer.observe(el));
}

// Initialize on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRevealAnimations);
} else {
    initRevealAnimations();
}

// Re-initialize on Astro page transitions
document.addEventListener('astro:page-load', initRevealAnimations);
