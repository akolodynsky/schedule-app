import { useDateStore, useTaskStore } from "@/src/presentation/stores";
import { container } from "@/src/shared/containers/container";
import { validateTask } from "./validateTask";
import { generateUniqueId } from "@/src/shared/utils";


export const createTask = async (handleBack: () => void, eventId?: string) => {
    const {name, updateTaskBlock} = useTaskStore.getState();
    const {date} = useDateStore.getState();

    if (await validateTask()) return;

    const id = generateUniqueId("t");

    await container.taskUseCases.createTask(id, date, name, false, eventId);
    await updateTaskBlock({id, date, name, isCompleted: false, eventId});
    handleBack();
};