import { create } from 'zustand';


interface DateStore {
    date: string;
    setDate: (date: string) => void;
    selectedDate: string;
    setSelectedDate: (selectedDate: string) => void;
}

export const useDateStore = create<DateStore>()((set) => ({
    date: new Date().toLocaleDateString("sv-SE"),
    setDate: (date: string) => set({ date }),

    selectedDate: new Date().toLocaleDateString("sv-SE"),
    setSelectedDate: (selectedDate: string) => set({ selectedDate }),
}));