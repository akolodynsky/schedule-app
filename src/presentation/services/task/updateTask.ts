import {useDateStore, useTaskStore} from "@/src/presentation/stores";
import {validateTask} from "./validateTask";
import {container} from "@/src/shared/containers/container";
import {loadTasks} from "@/src/presentation/services/task/loadTasks";


export const updateTask = async (id: string, handleBack?: () => void) => {
    const {name, isCompleted} = useTaskStore.getState();
    const {date} = useDateStore.getState();

    if (await validateTask()) return;

    const completed = !handleBack ? !isCompleted : isCompleted

    await container.taskUseCases.updateTask(id, date, name, completed);
    if (handleBack) {
        await loadTasks();
        handleBack();
    }
};