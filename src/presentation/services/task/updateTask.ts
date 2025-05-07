import {useDateStore, useTaskStore} from "@/src/presentation/stores";
import {validateTask} from "./validateTask";
import {container} from "@/src/shared/containers/container";
import {loadTasks} from "@/src/presentation/services/task/loadTasks";


export const updateTask = async (id: string, check?: boolean) => {
    const {name, isCompleted} = useTaskStore.getState();
    const {date} = useDateStore.getState();

    await validateTask();

    const completed = check ? !isCompleted : isCompleted

    await container.taskUseCases.updateTask(id, date, name, completed);
    !check && await loadTasks();
};