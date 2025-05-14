import {useDateStore, useTaskStore} from "@/src/presentation/stores";
import {generateUniqueId} from "@/src/shared/utils";
import {validateTask} from "./validateTask";
import {container} from "@/src/shared/containers/container";
import {loadTasks} from "@/src/presentation/services/task/loadTasks";


export const createTask = async (handleBack: () => void) => {
    const {name, reset} = useTaskStore.getState();
    const {date} = useDateStore.getState();

    if (await validateTask()) return;

    const id = generateUniqueId("t");

    await container.taskUseCases.createTask(id, date, name);
    await loadTasks();
    handleBack();
};