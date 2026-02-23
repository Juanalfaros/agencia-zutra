import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, locals }) => {
    if (request.headers.get("Content-Type") !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid Content-Type" }), {
            status: 400,
        });
    }

    try {
        const data = await request.json();
        const { name, email, service, urgency } = data;

        if (!name || !email || !service || !urgency) {
            return new Response(
                JSON.stringify({ error: "Todos los campos son obligatorios" }),
                { status: 400 },
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(
                JSON.stringify({ error: "Email inválido" }),
                { status: 400 },
            );
        }

        // --- GESTIÓN DE VARIABLES DE ENTORNO (Priorizar Cloudflare Runtime) ---
        const runtimeEnv = (locals as any)?.runtime?.env || {};
        const getEnv = (key: string) => runtimeEnv[key] || import.meta.env[key] || "";

        const BREVO_API_KEY = getEnv("BREVO_API_KEY").trim();
        // Lista opcional específica para leads del bot de WhatsApp
        const BREVO_LIST_WHATSAPP = getEnv("BREVO_LIST_WHATSAPP");

        if (!BREVO_API_KEY) {
            console.error("Missing Brevo Configuration");
            return new Response(JSON.stringify({ error: "Server Configuration Error" }), {
                status: 500,
            });
        }

        // 1. Guardar/Actualizar Contacto en Brevo
        // Usamos el endpoint de crear/actualizar para manejar emails existentes

        const listIds = [];
        if (BREVO_LIST_WHATSAPP && !isNaN(parseInt(BREVO_LIST_WHATSAPP))) {
            listIds.push(parseInt(BREVO_LIST_WHATSAPP));
        }

        const [firstName, ...lastNameArr] = name.trim().split(" ");
        const lastName = lastNameArr.join(" ");

        const brevoPayload: any = {
            email: email,
            attributes: {
                NOMBRE: firstName,
                APELLIDO: lastName || "-", // Brevo a veces requiere apellido
                SERVICE: service,
                URGENCY: urgency
            },
            updateEnabled: true
        };

        if (listIds.length > 0) {
            brevoPayload.listIds = listIds;
        }

        const response = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                "api-key": BREVO_API_KEY,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(brevoPayload),
        });

        // Si el contacto ya existe, Brevo puede devolver 204 o 200 si lo actualiza
        if (!response.ok && response.status !== 400) { // 400 bad request occurs if contact exists and updateEnabled is false, which we handle
            const errorData = await response.json();
            console.error("Error capturando lead en Brevo:", errorData);

            // Intentamos continuar de todos modos para que el usuario pueda ir al WhatsApp
            return new Response(JSON.stringify({ warning: "Lead not fully saved but proceeding" }), {
                status: 200,
            });
        }

        return new Response(JSON.stringify({ success: true, message: "Lead capturado silenciosamente" }), {
            status: 200,
        });
    } catch (error) {
        console.error("Unhandled Error in API Route:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }
};
