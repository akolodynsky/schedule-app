import {create} from 'zustand';


interface DateStore {
    date: string;
    setDate: (date: string) => void;
    selectedDate: string;
    setSelectedDate: (selectedDate: string) => void;
}

export const useDateStore = create<DateStore>()((set) => ({
    date: new Date().toISOString().split("T")[0],
    setDate: (date: string) => set({ date }),

    selectedDate: new Date().toISOString().split("T")[0],
    setSelectedDate: (selectedDate: string) => set({ selectedDate }),
}));