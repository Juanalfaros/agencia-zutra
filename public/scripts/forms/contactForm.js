import { toast } from '../utils/toast';

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

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
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';

    try {
      const response = await fetch('/api/contact', {
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

      toast.success('Tu mensaje ha sido enviado con éxito. Serás redireccionado en breve.', '¡Mensaje Enviado!');
      form.reset();

      // Pequeño delay para dejar que el usuario vea el toast si es necesario, 
      // aunque en una landing de conversión el redirect suele ser inmediato o muy rápido.
      setTimeout(() => {
        window.location.href = '/gracias';
      }, 1500);

    } catch (error) {
      toast.error('No pudimos enviar tu mensaje. Por favor, intenta de nuevo o escríbenos a hola@zutra.agency.', 'Error al enviar');
      console.error(error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}