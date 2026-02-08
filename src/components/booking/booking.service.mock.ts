import type { BookingSlot, BookingState } from "./booking.types";

/**
 * CONFIGURACIÓN SIMULADA (Cal.com Mock)
 * Modifica estos valores para probar distintos comportamientos del módulo.
 */
export const MOCK_CONFIG = {
    eventDurationMinutes: 45,
    workingHours: {
        start: 9, // 09:00
        end: 18,   // 18:00
    },
    daysOfWeekAvailable: [1, 2, 3, 4, 5], // Lunes a Viernes
    simulationLatencyMs: 800,
    forceFailureRate: 0, // 0 to 1 (0.1 = 10% de error)
    timezone: "America/Santiago",
};

/**
 * Simula la obtención de slots disponibles desde la API.
 */
export const fetchMockSlots = async (date: string): Promise<BookingSlot[]> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_CONFIG.simulationLatencyMs));

    const dayObj = new Date(date + "T00:00:00");
    const dayOfWeek = dayObj.getDay();

    // Si el día no está en la configuración, no hay slots
    if (!MOCK_CONFIG.daysOfWeekAvailable.includes(dayOfWeek)) {
        return [];
    }

    const slots: BookingSlot[] = [];
    const { start, end } = MOCK_CONFIG.workingHours;

    for (let hour = start; hour < end; hour++) {
        // Simular bloques (ej: cada hora o cada duración del evento)
        const timeString = `${String(hour).padStart(2, '0')}:00`;
        const nextHour = hour + 1;
        const endTimeString = `${String(nextHour).padStart(2, '0')}:00`;

        // Simular que algunos están ocupados aleatoriamente
        const isOccupied = Math.random() < 0.2;

        if (!isOccupied) {
            slots.push({
                startTime: `${date}T${timeString}:00`,
                endTime: `${date}T${endTimeString}:00`,
                available: true
            });
        }
    }

    return slots;
};

/**
 * Simula el envío de la reserva a la API.
 */
export const submitMockBooking = async (data: BookingState['formData']): Promise<{ success: boolean; message?: string }> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_CONFIG.simulationLatencyMs + 400));

    // Simular error aleatorio si está configurado
    if (Math.random() < MOCK_CONFIG.forceFailureRate) {
        return {
            success: false,
            message: "No se pudo conectar con el servidor de Cal.com. Inténtalo de nuevo."
        };
    }

    console.log("MOCK SUBMIT SUCCESS:", data);
    return { success: true };
};
