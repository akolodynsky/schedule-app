import {container} from "@/src/shared/containers/container";
import {useTaskStore} from "@/src/presentation/stores";


export const removeTask = async (id: string) => {
    await container.taskUseCases.deleteTask(id);
    await useTaskStore.getState().updateTaskBlock(id);
};