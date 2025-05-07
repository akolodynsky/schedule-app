import {useDateStore, useTaskStore} from "@/src/presentation/stores";


export const updateTaskState = (selectedTask: ITask) => {
    const {setName, setIsCompleted, setSelectedTask} = useTaskStore.getState();
    const {setDate} = useDateStore.getState();

    setSelectedTask(selectedTask);
    setName(selectedTask.name);
    setIsCompleted(selectedTask.isCompleted);
    setDate(selectedTask.date);
};