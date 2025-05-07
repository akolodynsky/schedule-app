import { create } from 'zustand'


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
    updateTaskBlock: (date: string, updatedTask: ITask, eventId?: string) => void,

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

export const useTaskStore = create<TaskState & TaskAction>()((set) => ({
    tasks: [],
    setTasks: (tasks) => set({ tasks }),
    updateTaskBlock: (date, updatedTask) => set(state => {
        const blocks = [...state.tasks];
        const index = blocks.findIndex(block => block.date === date);

        if (index !== -1) {
            const block = blocks[index];
            const existingTaskIndex = block.tasks.findIndex(task => task.id === updatedTask.id);

            let newTasks;

            if (existingTaskIndex !== -1) {
                newTasks = [...block.tasks];
                newTasks[existingTaskIndex] = updatedTask;
            } else {
                newTasks = [...block.tasks, updatedTask];
            }

            blocks[index] = {
                ...block,
                tasks: newTasks,
            }
        } else {
            blocks.push({
                date: updatedTask.date,
                tasks: [updatedTask],
            })

            blocks.sort((a, b) => a.date.localeCompare(b.date));
        }

        return { tasks: blocks };
    }),

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