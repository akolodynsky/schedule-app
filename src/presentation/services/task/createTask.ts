import {useDateStore, useTaskStore} from "@/src/presentation/stores";
import {generateUniqueId} from "@/src/shared/utils";
import {validateTask} from "./validateTask";
import {container} from "@/src/shared/containers/container";
import {loadTasks} from "@/src/presentation/services/task/loadTasks";

export const createTask = async () => {
    const {name} = useTaskStore.getState();
    const {date} = useDateStore.getState();

    await validateTask();

    const id = generateUniqueId("t");

    await container.taskUseCases.createTask(id, date, name);
    await loadTasks();
};