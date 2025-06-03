import { useTaskStore } from "@/src/presentation/stores";
import { container } from "@/src/shared/containers/container";


export const loadTasks = async () => {
    const tasks = await container.taskUseCases.getAllTasks();
    console.log("load tasks")
    useTaskStore.getState().setTasks(tasks);
}