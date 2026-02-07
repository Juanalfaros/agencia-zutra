// src/scripts/ui/carousel.js

export function initCarousel() {
  const carousels = document.querySelectorAll(".hero-carousel");

  carousels.forEach((carousel) => {
    // Evitar doble inicialización
    if (carousel.dataset.initialized) return;
    carousel.dataset.initialized = "true";

    const slides = carousel.querySelectorAll(".hero-carousel__slide");
    const nextButton = carousel.querySelector(".nav-button--next");
    const prevButton = carousel.querySelector(".nav-button--prev");
    const dots = carousel.querySelectorAll(".pagination-dot");

    if (!slides.length || !nextButton || !prevButton) return;

    let currentSlide = 0;
    let autoPlayInterval;

    function showSlide(index) {
      if (index >= slides.length) {
        index = 0;
      } else if (index < 0) {
        index = slides.length - 1;
      }

      slides.forEach((slide) => slide.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      if (slides[index]) slides[index].classList.add("active");
      if (dots[index]) dots[index].classList.add("active");

      currentSlide = index;
    }

    function next() {
      showSlide(currentSlide + 1);
    }

    function prev() {
      showSlide(currentSlide - 1);
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayInterval = setInterval(next, 5000);
    }

    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    nextButton.addEventListener("click", () => {
      next();
      resetAutoPlay();
    });

    prevButton.addEventListener("click", () => {
      prev();
      resetAutoPlay();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        resetAutoPlay();
      });
    });

    // Inicializar el primer slide y el autoplay
    showSlide(0);
    startAutoPlay();

    // Detener autoplay cuando el ratón está encima (opcional pero recomendado)
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
  });
}