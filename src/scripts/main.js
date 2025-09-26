document.addEventListener('DOMContentLoaded', () => {

  // === Asignación de Acento y Favicon Aleatorio (Sin Memoria) ===
  (() => {
    /**
     * Actualiza el <link> del favicon con un nuevo color.
     * @param {string} color - El nuevo color en formato hexadecimal (ej. "#EFD319").
     */
    const updateFavicon = (color) => {
        const faviconLink = document.getElementById('dynamic-favicon');
        if (!faviconLink) {
            // No mostramos advertencia para no ensuciar la consola si el favicon no es dinámico.
            return;
        }

        const svgTemplate = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.79 93.73">
                <defs>
                    <style>
                        .cls-1 { fill: ${color}; }
                        .cls-2 { fill: #fff8e0; }
                    </style>
                </defs>
                <g>
                    <path class="cls-1" d="M74.68,42.11l-24.86,19.05c-.57.44-.9.89-.9,1.23s.1.44,1,.44h49.93c.64-4.63.93-9.92.93-15.97C100.79,7.58,88.36,0,50.4,0S0,7.58,0,46.86s12.43,46.87,50.4,46.87c23.86,0,37.64-3.01,44.58-14.99H29.78c-5.6,0-9.75-4.37-9.75-11.42,0-5.82,2.02-8.86,5.48-11.54l25.65-19.59c.56-.45.89-.79.89-1.01,0-.34-.34-.56-1.11-.56h-20.12c-4.78,0-8.66-3.88-8.66-8.66v-6.57h46.92c6.5,0,10.98,3.81,10.98,10.87,0,6.61-2.7,9.74-5.38,11.86Z"/>
                    <path class="cls-2" d="M99.86,62.83c-.89,6.55-2.48,11.76-4.89,15.91H29.78c-5.6,0-9.75-4.37-9.75-11.42,0-5.82,2.02-8.86,5.48-11.54l25.65-19.59c.56-.45.89-.79.89-1.01,0-.34-.34-.56-1.11-.56h-20.12c-4.78,0-8.66-3.88-8.66-8.66v-6.57h46.92c6.5,0,10.98,3.81,10.98,10.87,0,6.61-2.7,9.74-5.38,11.86l-24.86,19.05c-.57.44-.9.89-.9,1.23s.1.44,1,.44h49.93Z"/>
                </g>
            </svg>`;

        const encodedSvg = encodeURIComponent(svgTemplate.trim());
        const newFaviconUri = `data:image/svg+xml,${encodedSvg}`;
        faviconLink.href = newFaviconUri;
    };

    const palettes = [
      { main: '#EFD319', hover: '#FACC15' }, // Amarillo
      { main: '#19EFB5', hover: '#15C999' }, // Verde Menta
      { main: '#FF0055', hover: '#D6004C' }, // Magenta
      { main: '#811DBC', hover: '#6A169E' } // Púrpura
    ];

    const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];

    // Aplicar el color de acento al CSS
    document.documentElement.style.setProperty('--color-accent', randomPalette.main);
    document.documentElement.style.setProperty('--color-accent-hover', randomPalette.hover);

    // Actualizar el favicon con el mismo color
    updateFavicon(randomPalette.main);
  })();

  // === Mobile nav ===
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

  // === Header shadow on scroll ===
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // === Scroll-spy ===
  (() => {
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
  })();

  // === Reveal on view ===
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

  // === Año en el footer ===
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // === Tabs "Quiénes somos" ===
  (() => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    function activateTab(targetId) {
      tabButtons.forEach(button => {
        const isActive = button.dataset.target === targetId;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-selected', isActive);
      });

      tabPanels.forEach(panel => {
        const isActive = panel.id === targetId;
        panel.classList.toggle('hidden', !isActive);
        panel.classList.toggle('active', isActive);
      });
    }

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        activateTab(button.dataset.target);
      });
    });
  })();

// === Validación de formulario de contacto ===
const form = document.getElementById('contact-form');
if (form) {
  const statusDiv = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-button');
  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    message: document.getElementById('message'),
    consent: document.getElementById('consent')
  };
  const errs = {
    name: document.getElementById('err-name'),
    email: document.getElementById('err-email'),
    message: document.getElementById('err-message'),
    consent: document.getElementById('err-consent')
  };

  const show = (k, msg) => { if (errs[k]) { errs[k].textContent = msg; errs[k].classList.remove('hidden'); } };
  const hide = (k) => { if (errs[k]) errs[k].classList.add('hidden'); };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let ok = true;
    if (!fields.name.value.trim()) { show('name', 'Ingresa tu nombre.'); ok = false; } else hide('name');
    if (!fields.email.validity.valid) { show('email', 'Ingresa un correo válido.'); ok = false; } else hide('email');
    if (!fields.message.value.trim()) { show('message', 'Escribe un mensaje.'); ok = false; } else hide('message');
    if (!fields.consent.checked) { show('consent', 'Debes aceptar para continuar.'); ok = false; } else hide('consent');
    if (!ok) return;

    submitBtn.disabled = true;
    statusDiv.textContent = 'Enviando…';
    statusDiv.className = 'form-status form-status--sending';

    try {
      const response = await fetch('/.netlify/functions/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name.value,
          email: fields.email.value,
          message: fields.message.value,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Hubo un problema al enviar el formulario.');
      }

      statusDiv.textContent = '¡Gracias! Te respondemos pronto.';
      statusDiv.className = 'form-status form-status--success';
      form.reset();
  
    } catch (error) {
      statusDiv.textContent = 'Error al enviar. Intenta de nuevo.';
      statusDiv.className = 'form-status form-status--error'; // Quizás necesites añadir esta clase a tu CSS
      console.error(error);
    } finally {
      submitBtn.disabled = false;
      setTimeout(() => { statusDiv.textContent = ''; statusDiv.className = 'form-status'; }, 4000);
    }
  });
}

  // === CTA header mini al hacer scroll (desktop) ===
  (() => {
    const container = document.getElementById('header-cta-container');
    const mainCta = document.getElementById('cta-header-main');
    if (!container || !mainCta) return;

    let miniCta = document.getElementById('cta-header-mini');
    if (!miniCta) {
      miniCta = document.createElement('a');
      miniCta.id = 'cta-header-mini';
      miniCta.href = '#contacto';
      miniCta.textContent = 'Auditoría';
      miniCta.setAttribute('data-track', 'cta_header_mini');
      miniCta.classList.add('button', 'button--primary', 'button--mini', 'hidden');
      container.appendChild(miniCta);
    }

    const toggle = () => {
      const scrolled = window.scrollY >= 200;
      mainCta.classList.toggle('hidden', scrolled);
      miniCta.classList.toggle('hidden', !scrolled);
    };

    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
  })();

  // === Hero Carousel ===
  (() => {
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
  })();

});