// netlify/functions/submit-lead.js
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const { email, name, message } = data;

    if (!email || !name || !message) {
      return { statusCode: 400, body: 'Faltan campos requeridos.' };
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY, // Se leerá desde Netlify (seguro)
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          // Asegúrate que estos nombres de atributo existen en Brevo
          // Por defecto suelen ser en mayúsculas. Ej: NOMBRE, APELLIDO
          NOMBRE: name, 
          MENSAJE: message,
        },
        // ¡MUY IMPORTANTE! Cambia el número por el ID de tu lista en Brevo
        listIds: [2] 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error desde Brevo:', errorData);
      return { statusCode: response.status, body: JSON.stringify(errorData) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Lead recibido con éxito!' }),
    };

  } catch (error) {
    console.error('Error en la función serverless:', error);
    return { statusCode: 500, body: 'Error interno del servidor.' };
  }
};