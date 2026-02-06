export const prerender = false;

export const POST = async ({ request }: { request: Request }) => {
    if (request.headers.get("Content-Type") !== "application/json") {
        return new Response(JSON.stringify({ message: "Content-Type must be application/json" }), {
            status: 400,
        });
    }

    try {
        const data = await request.json();
        const { name, email, message } = data;

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ message: "Faltan campos requeridos" }), {
                status: 400,
            });
        }

        const BREVO_API_KEY = import.meta.env.BREVO_API_KEY;
        const BREVO_LIST_ID = import.meta.env.BREVO_LIST_ID ? parseInt(import.meta.env.BREVO_LIST_ID) : 4;

        if (!BREVO_API_KEY) {
            console.error("BREVO_API_KEY no está definida en las variables de entorno.");
            return new Response(JSON.stringify({ message: "Error interno de configuración" }), {
                status: 500,
            });
        }

        const response = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "api-key": BREVO_API_KEY,
            },
            body: JSON.stringify({
                email: email,
                attributes: {
                    NOMBRE: name,
                    MENSAJE: message,
                },
                listIds: [BREVO_LIST_ID],
                updateEnabled: true // Actualiza el contacto si ya existe
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error respuesta Brevo:", errorData);
            return new Response(JSON.stringify({ message: "Error al enviar a Brevo", details: errorData }), {
                status: response.status,
            });
        }

        return new Response(JSON.stringify({ message: "Lead recibido con éxito" }), {
            status: 200,
        });

    } catch (error) {
        console.error("Error en API Contact:", error);
        return new Response(JSON.stringify({ message: "Error interno del servidor" }), {
            status: 500,
        });
    }
};
