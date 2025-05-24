import {router} from "expo-router";

import {useDateStore, useEventStore, useRecurringOptionsStore} from "@/src/presentation/stores";
import {loadEvents} from "./loadEvents";
import {validateEvent} from "./validateEvent";
import {container} from "@/src/shared/containers/container";
import {buildRecurringOptions} from "@/src/presentation/services/event/buildRecurringOptions";


export const updateEvent = async (selectedEvent: IEvent) => {
    const {category, name, description, tasks, start, end, reset} = useEventStore.getState();
    const {frequency, resetRecurring, disabled} = useRecurringOptionsStore.getState();
    const {selectedDate, date, setSelectedDate} = useDateStore.getState();

    if (await validateEvent()) return;

    let eventDate = date;

    const recurringId = selectedEvent.recurringId;

    const recurringOptions = buildRecurringOptions(selectedEvent.recurringId!);

    if (frequency === "once" && recurringId && !disabled) {
        const eventIds = await container.eventUseCases.deleteRecurringOptions(recurringId, selectedDate);

        if (eventIds.length > 0) {
            for (const eventId of eventIds) {
                await container.taskUseCases.deleteTasksByEventId(eventId);
            }
        }

        eventDate = selectedDate;
    }

    const eventId = disabled
        ? await container.eventUseCases.updateSingleEvent(eventDate, name, description, category!, start, end, recurringId!)
        : await container.eventUseCases.updateRecurringEvent(selectedEvent.id, eventDate, name, description, category!, start, end, recurringOptions)



    if (tasks.length > 0 && !(recurringId && !disabled)) {
        tasks.map(async (task) => {
            await container.taskUseCases.createTask(task.id, eventDate, task.name, task.isCompleted, eventId);
        });
    }

    await loadEvents(selectedDate);
    router.back();
    if (!recurringId || disabled) setSelectedDate(date);
    resetRecurring();
    reset();
};