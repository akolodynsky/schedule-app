import {useDateStore, useTaskStore} from "@/src/presentation/stores";
import {generateUniqueId} from "@/src/shared/utils";
import {validateTask} from "./validateTask";
import {container} from "@/src/shared/containers/container";
import {loadTasks} from "@/src/presentation/services/task/loadTasks";


export const createTask = async (handleBack: () => void, eventId?: string) => {
    const {name, updateTaskBlock} = useTaskStore.getState();
    const {date} = useDateStore.getState();

    if (await validateTask()) return;

    const id = generateUniqueId("t");

    await container.taskUseCases.createTask(id, date, name, false, eventId);
    updateTaskBlock(date, {id, date, name, isCompleted: false, eventId}, eventId);
    handleBack();
};