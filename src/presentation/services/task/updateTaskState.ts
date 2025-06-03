import { useDateStore, useEventStore, useTaskStore } from "@/src/presentation/stores";
import { container } from "@/src/shared/containers/container";


export const updateTaskState = (selectedTask: ITask) => {
    const {setName, setIsCompleted, setSelectedTask} = useTaskStore.getState();
    const {setDate} = useDateStore.getState();

    setSelectedTask(selectedTask);
    setName(selectedTask.name);
    setIsCompleted(selectedTask.isCompleted);
    setDate(selectedTask.date);
};

export const updateTasksState = async (id: string, date: string) => {
    const tasks = await container.taskUseCases.getTasksByEventId(id, date);
    useEventStore.getState().setTasks(tasks);
};