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

    const recurringId = selectedEvent.recurringId;

    const recurringOptions = buildRecurringOptions(selectedEvent.recurringId!);

    const eventId = disabled
        ? await container.eventUseCases.updateSingleEvent(date, name, description, category!, start, end, recurringId!)
        : await container.eventUseCases.updateRecurringEvent(selectedEvent.id, date, name, description, category!, start, end, recurringOptions)

    if (frequency === "once" && recurringId && !disabled) {
        await container.eventUseCases.deleteRecurringOptions(recurringId);
    }

    if (tasks.length > 0) {
        if (recurringId && !disabled) {
            await container.taskUseCases.deleteTask(eventId);
        }

        tasks.map(async (task) => {
            await container.taskUseCases.createTask(task.id, date, task.name, task.isCompleted, eventId);
        });
    }

    await loadEvents(selectedDate);
    router.back();
    if (!recurringId || disabled) setSelectedDate(date);
    resetRecurring();
    reset();
};