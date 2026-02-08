export interface BookingSlot {
    startTime: string; // ISO 8601
    endTime: string;   // ISO 8601
    available: boolean;
}

export interface BookingState {
    step: number; // 1: Date/Time, 2: Form, 3: Success, 4: Error
    selectedDate: string | null; // YYYY-MM-DD
    selectedTime: string | null; // HH:mm
    selectedSlot: BookingSlot | null;
    formData: {
        name: string;
        email: string;
        rut?: string;
        phone?: string;
        company?: string;
        meetingType: 'google_meet' | 'zoom' | 'teams' | 'cal_video' | 'phone' | 'physical';
        address?: string; // For physical meetings
        notes?: string;
    };
    status: 'idle' | 'loading' | 'submitting' | 'success' | 'error';
    errorMessage?: string;
    timeFormat: '12h' | '24h';
}

export interface CalendarMonth {
    year: number;
    month: number; // 0-11
    days: CalendarDay[];
}

export interface CalendarDay {
    date: string; // YYYY-MM-DD
    dayOfMonth: number;
    isToday: boolean;
    isCurrentMonth: boolean;
    isPast: boolean;
    hasSlots: boolean; // Pre-calculated from API
}
