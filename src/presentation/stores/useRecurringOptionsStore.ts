import { create } from 'zustand'


interface RecurringOptionsState {
    frequency: "once" | "daily" | "weekly" | "monthly";
    interval: number;
    weekDays: number[] | null;
    endRepeat: string | null;
    disabled: boolean;
}

interface RecurringOptionsAction {
    resetRecurring: () => void,

    setFrequency: (frequency: "once" | "daily" | "weekly" | "monthly") => void,
    setInterval: (number: number) => void,
    setWeekDays: (weekDays: number[] | null) => void,
    setEndRepeat: (endRepeat: string | null) => void,
    setDisabled: (disabled: boolean) => void,
}

const initialState: RecurringOptionsState = {
    frequency: "once",
    interval: 1,
    weekDays: [],
    endRepeat: null,
    disabled: false,
}

export const useRecurringOptionsStore = create<RecurringOptionsState & RecurringOptionsAction>()((set) => ({
    ...initialState,

    setFrequency: (frequency) => set({ frequency }),
    setInterval: (interval) => set({ interval }),
    setWeekDays: (daysOfWeek) => set({ weekDays: daysOfWeek }),
    setEndRepeat: (endRepeat) => set({ endRepeat }),
    setDisabled: (disabled) => set({ disabled }),
    resetRecurring: () => {
        set(initialState)
    },
}));