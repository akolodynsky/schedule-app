import {useDateStore} from "@/src/presentation/stores";
import {loadEvents} from "./loadEvents";
import {container} from "@/src/shared/containers/container";


export const removeEvent = async (id: string, single?: boolean) => {
    const {selectedDate} = useDateStore.getState();
    if (single) {
        await container.eventUseCases.deleteSingleEvent(id, selectedDate);
    } else {
        await container.eventUseCases.deleteRecurringEvents(id);
    }

    await container.taskUseCases.deleteTask(id);
    await loadEvents(selectedDate);
};