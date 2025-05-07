import {router} from "expo-router";

import {useDateStore, useEventStore, useRecurringOptionsStore} from "@/src/presentation/stores";
import {generateUniqueId, getDayIndex} from "@/src/shared/utils";
import {loadEvents} from "./loadEvents";
import {validateEvent} from "./validateEvent";
import {container} from "@/src/shared/containers/container";


export const updateEvent = async (selectedEvent: IEvent) => {
    const {category, name, description, start, end, reset} = useEventStore.getState();
    const {frequency, interval, weekDays, endRepeat, resetRecurring, disabled} = useRecurringOptionsStore.getState();
    const {selectedDate, date} = useDateStore.getState();

    await validateEvent();

    let recurringOptions: Omit<IRecurringOptions, "exceptDays"> | null = null;
    const recurringId: string | null = selectedEvent.recurringId;
    let eventDate = date;

    if (frequency !== "once") {
        const monthDay = frequency === "monthly" ? new Date(date).getDate() : null;
        const daysOfWeek = weekDays.length === 0 && frequency === "weekly" ? [getDayIndex(date)] : weekDays;
        const id = recurringId ?? generateUniqueId("r");
        recurringOptions = {id, frequency, interval, weekDays: daysOfWeek, monthDay, startRepeat: date, endRepeat};
    } else {
        eventDate = selectedDate;
    }

    if (!disabled) {
        await container.eventUseCases.updateRecurringEvent(selectedEvent.id, eventDate, name, description, category!, start, end, recurringOptions)
    } else if (recurringId) {
        await container.eventUseCases.updateSingleEvent(date, name, description, category!, start, end, recurringId)
    }

    if (frequency === "once" && recurringId) await container.eventUseCases.deleteRecurringOptions(recurringId);

    await loadEvents(selectedDate);
    router.back();
    resetRecurring();
    reset();
};