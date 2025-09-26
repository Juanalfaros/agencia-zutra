// src/scripts/forms/contactForm.js

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

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
      statusDiv.className = 'form-status form-status--error';
      console.error(error);
    } finally {
      submitBtn.disabled = false;
      setTimeout(() => { statusDiv.textContent = ''; statusDiv.className = 'form-status'; }, 4000);
    }
  });
}