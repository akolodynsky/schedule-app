import { create } from 'zustand'
import {useEventStore} from "@/src/presentation/stores/useEventStore";


interface TaskState {
    selectedTask: Task | undefined,

    mergedTasksBlocks: MergedTasksBlock[];
    shouldReloadTasks: boolean,

    name: string,
    isCompleted: boolean,
    error: string,
}

interface TaskAction {
    setMergedTasksBlocks: (mergedTasksBlocks: MergedTasksBlock[]) => void,
    updateMergedTasks: (date: string, updatedTasks: Task[], eventId?: string) => void,

    setSelectedTask: (selectedTask: Task | undefined) => void,
    setShouldReloadTasks: (shouldReloadTasks: boolean) => void,

    setName: (name: string) => void,
    setIsCompleted: (isComplete: boolean) => void,
    setError: (error: string) => void,
    reset: () => void,
}

const initialState: Omit<TaskState, "shouldReloadTasks" | "mergedTasksBlocks"> = {
    name: "",
    isCompleted: false,
    selectedTask: undefined,
    error: "",
}

export const useTaskStore = create<TaskState & TaskAction>()((set) => ({
    mergedTasksBlocks: [],
    setMergedTasksBlocks: (mergedTasksBlocks) => {set({ mergedTasksBlocks })},
    updateMergedTasks: (date, updatedTasks, eventId) => set(state => {
        const blocks = [...state.mergedTasksBlocks];
        const index = blocks.findIndex(block => block.date === date);

        if (index !== -1) {
            if (eventId) {
                const updatedEvents = blocks[index].events.map(event =>
                    event.id === eventId
                        ? {...event, tasks: updatedTasks}
                        : event
                );

                blocks[index] = {
                    ...blocks[index],
                    events: updatedEvents,
                };
            } else {
                blocks[index] = {
                    ...blocks[index],
                    tasks: updatedTasks,
                };
            }
        } else {
            blocks.push({
                date,
                tasks: updatedTasks,
                events: [],
            });

            blocks.sort((a, b) => a.date.localeCompare(b.date));
        }

        return { mergedTasksBlocks: blocks };
    }),

    setSelectedTask: (selectedTask: Task | undefined) => set({ selectedTask }),
    shouldReloadTasks: true,
    setShouldReloadTasks: (shouldReloadTasks: boolean) => set({ shouldReloadTasks }),

    ...initialState,

    setName: (name) => set({ name }),
    setIsCompleted: (isCompleted) => set({ isCompleted }),
    setError: (error: string) => set({ error }),
    reset: () => {
        set(initialState)
    }
}));