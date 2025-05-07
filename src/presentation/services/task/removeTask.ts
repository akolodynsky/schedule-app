import {container} from "@/src/shared/containers/container";


export const removeTask = async (id: string) => {
    await container.taskUseCases.deleteTask(id);
};