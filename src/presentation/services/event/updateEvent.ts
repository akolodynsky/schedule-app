import { router } from "expo-router";

import { useDateStore, useEventStore, useRecurringOptionsStore, useTaskStore } from "@/src/presentation/stores";
import { container } from "@/src/shared/containers/container";
import { loadEvents } from "./loadEvents";
import { validateEvent } from "./validateEvent";
import { buildRecurringOptions } from "./buildRecurringOptions";


export const updateEvent = async (selectedEvent: IEvent) => {
    const {category, name, description, tasks, start, end} = useEventStore.getState();
    const {frequency, disabled} = useRecurringOptionsStore.getState();
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
        await Promise.all(tasks.map(task => {
            container.taskUseCases.createTask(task.id, eventDate, task.name, task.isCompleted, eventId);
        }))

        await new Promise((res) => setTimeout(res, 50));

        useTaskStore.getState().setShouldReloadTasks(true);
    }

    if (!recurringId || disabled) setSelectedDate(date);
    await loadEvents(!recurringId || disabled ? date : selectedDate);
    router.back();
};