import {useDateStore} from "@/src/presentation/stores";
import {container} from "@/src/shared/containers/container";
import {loadEvents} from ".";

const { eventUseCases } = container


export const removeEvent = async (id: string, single?: boolean) => {
    const {selectedDate} = useDateStore.getState();
    if (single) {
        await eventUseCases.deleteSingleEvent(id, selectedDate);
    } else {
        await eventUseCases.deleteRecurringEvents(id);
    }
    await loadEvents(selectedDate);
};