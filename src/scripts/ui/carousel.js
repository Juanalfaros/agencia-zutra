// src/scripts/ui/carousel.js

export function initCarousel() {
  const slides = document.querySelectorAll('.hero-carousel__slide');
  const prevButton = document.querySelector('.hero-carousel__nav-button--prev');
  const nextButton = document.querySelector('.hero-carousel__nav-button--next');
  const dots = document.querySelectorAll('.hero-carousel__dot');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let autoPlayInterval;

  function showSlide(index) {
    if (index >= slides.length) {
      index = 0;
    } else if (index < 0) {
      index = slides.length - 1;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');

    currentSlide = index;
  }

  function next() {
    showSlide(currentSlide + 1);
  }

  function prev() {
    showSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    stopAutoPlay(); // Evita múltiples intervalos
    autoPlayInterval = setInterval(next, 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  nextButton.addEventListener('click', () => {
    next();
    resetAutoPlay();
  });

  prevButton.addEventListener('click', () => {
    prev();
    resetAutoPlay();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.dataset.slideTo));
      resetAutoPlay();
    });
  });

  showSlide(0);
  startAutoPlay();
}