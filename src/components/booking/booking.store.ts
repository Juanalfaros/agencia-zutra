import { map } from 'nanostores';
import type { BookingState, BookingSlot } from './booking.types';

// Initial State
export const bookingStore = map<BookingState>({
    step: 1,
    selectedDate: null,
    selectedTime: null,
    selectedSlot: null,
    formData: {
        name: '',
        email: '',
        meetingType: 'google_meet',
        rut: '',
        phone: '',
        company: '',
        address: '',
        notes: ''
    },
    status: 'idle',
    timeFormat: '24h',
});

// Actions
export const setStep = (step: number) => {
    bookingStore.setKey('step', step);
};

export const setSelectedDate = (date: string) => {
    bookingStore.setKey('selectedDate', date);
    bookingStore.setKey('selectedTime', null); // Reset time when date changes
    bookingStore.setKey('selectedSlot', null);
};

export const setSelectedTime = (time: string) => {
    bookingStore.setKey('selectedTime', time);
};

export const updateFormData = (field: keyof BookingState['formData'], value: string) => {
    const current = bookingStore.get().formData;
    bookingStore.setKey('formData', { ...current, [field]: value });
};

export const setTimeFormat = (format: '12h' | '24h') => {
    bookingStore.setKey('timeFormat', format);
};

export const setStatus = (status: BookingState['status'], message?: string) => {
    bookingStore.setKey('status', status);
    if (message) bookingStore.setKey('errorMessage', message);
};

export const resetBooking = () => {
    bookingStore.set({
        step: 1,
        selectedDate: null,
        selectedTime: null,
        selectedSlot: null,
        formData: {
            name: '',
            email: '',
            meetingType: 'google_meet',
            rut: '',
            phone: '',
            company: '',
            address: '',
            notes: ''
        },
        status: 'idle',
        timeFormat: '24h',
    });
};

import { fetchMockSlots, submitMockBooking } from './booking.service.mock';

// ... (previous actions and state)

// Actions
export const fetchSlotsForDate = async (date: string): Promise<BookingSlot[]> => {
    return await fetchMockSlots(date);
};

export const submitBookingInformation = async (): Promise<{ success: boolean; message?: string }> => {
    const { formData } = bookingStore.get();
    setStatus('submitting');

    try {
        const result = await submitMockBooking(formData);
        if (result.success) {
            setStatus('success');
            setStep(3);
        } else {
            setStatus('error', result.message);
        }
        return result;
    } catch (e) {
        setStatus('error', "Error inesperado al procesar la reserva.");
        return { success: false, message: "Error inesperado." };
    }
};

