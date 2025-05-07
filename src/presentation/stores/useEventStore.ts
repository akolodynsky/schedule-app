import { create } from 'zustand';


interface EventState {
    events: (IEvent | Gap)[];
    selectedEvent: IEvent | null;
    error: string,

    category: ICategory | null,
    name: string,
    description: string,
    tasks: ITask[],
    start: string,
    end: string,
}

interface EventAction {
    setEvents: (events: (IEvent | Gap)[]) => void;
    setSelectedEvent: (selectedEvent: IEvent | null) => void;
    setError: (error: string) => void,
    reset: () => void,

    setCategory: (category: ICategory | null) => void,
    setName: (name: string) => void,
    setDescription: (description: string) => void,
    setTasks: (tasks: ITask[]) => void,
    setStart: (start: string) => void,
    setEnd: (end: string) => void,
}

const initialState: Omit<EventState, "events"> = {
    selectedEvent: null,
    error: "",

    category: null,
    name: "",
    description: "",
    tasks: [],
    start: "00:00",
    end: "00:00",
}

export const useEventStore = create<EventState & EventAction>()((set) => ({
    events: [],
    setEvents: (events: (IEvent | Gap)[]) => set({ events }),
    setSelectedEvent: (selectedEvent: IEvent | null) => set({ selectedEvent }),
    setError: (error) => set({ error }),
    reset: () => {
        set(initialState)
    },

    ...initialState,

    setCategory: (category) => set({ category }),
    setName: (name) => set({ name }),
    setDescription: (description) => set({ description }),
    setTasks: (tasks) => set({ tasks }),
    setStart: (start) => set({ start }),
    setEnd: (end) => set({ end }),
}));