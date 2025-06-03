import { create } from 'zustand'
import { deleteFromTaskStore, updateTaskStore } from "@/src/presentation/services/task/updateTaskStore";


interface TaskState {
    selectedTask: ITask | null,

    tasks: ITaskBlock[];
    shouldReloadTasks: boolean,

    name: string,
    isCompleted: boolean,
    error: string,
}

interface TaskAction {
    setTasks: (tasks: ITaskBlock[]) => void,
    updateTaskBlock: (updatedTask: ITask | string) => Promise<void>,

    setSelectedTask: (selectedTask: ITask | null) => void,
    setShouldReloadTasks: (shouldReloadTasks: boolean) => void,

    setName: (name: string) => void,
    setIsCompleted: (isComplete: boolean) => void,
    setError: (error: string) => void,
    reset: () => void,
}

const initialState: Omit<TaskState, "shouldReloadTasks" | "tasks"> = {
    name: "",
    isCompleted: false,
    selectedTask: null,
    error: "",
}

export const useTaskStore = create<TaskState & TaskAction>()((set, get) => ({
    tasks: [],
    setTasks: (tasks) => set({ tasks }),

    updateTaskBlock: async (updatedTask) => {
        const updatedTasks = typeof updatedTask === 'string'
            ? deleteFromTaskStore(get().tasks, updatedTask)
            : await updateTaskStore(get().tasks, updatedTask)

        set({ tasks: updatedTasks });
    },

    setSelectedTask: (selectedTask) => set({ selectedTask }),
    shouldReloadTasks: true,
    setShouldReloadTasks: (shouldReloadTasks) => set({ shouldReloadTasks }),

    ...initialState,

    setName: (name) => set({ name }),
    setIsCompleted: (isCompleted) => set({ isCompleted }),
    setError: (error) => set({ error }),
    reset: () => {
        set(initialState)
    }
}));