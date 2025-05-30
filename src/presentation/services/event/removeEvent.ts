import {loadEvents} from "./loadEvents";
import {container} from "@/src/shared/containers/container";
import {useDateStore, useTaskStore} from "@/src/presentation/stores";


export const removeEvent = async (id: string, date?: string) => {
    let eventIds: string[] = [];

    date
        ? await container.eventUseCases.deleteSingleEvent(id, date)
        : eventIds = await container.eventUseCases.deleteRecurringOptions(id)

    if (id.startsWith("e")) await container.taskUseCases.deleteTasksByEventId(id);

    if (eventIds.length > 0) {
        for (const eventId of eventIds) {
            await container.taskUseCases.deleteTasksByEventId(eventId);
        }
    }

    useTaskStore.getState().setShouldReloadTasks(true);

    await loadEvents(useDateStore.getState().selectedDate);
};