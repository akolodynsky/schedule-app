import { useDateStore, useTaskStore } from "@/src/presentation/stores";
import { container } from "@/src/shared/containers/container";
import { validateTask } from "./validateTask";


export const updateTask = async (id: string, eventId: string | undefined, handleBack?: () => void) => {
    const {name, isCompleted, updateTaskBlock} = useTaskStore.getState();
    const {date} = useDateStore.getState();

    if (await validateTask()) return;

    const completed = !handleBack ? !isCompleted : isCompleted

    await container.taskUseCases.updateTask(id, date, name, completed, eventId);
    await updateTaskBlock({id, date, name, isCompleted: completed, eventId});

    handleBack && handleBack();
};