import {router} from "expo-router";

import {useDateStore, useEventStore, useRecurringOptionsStore} from "@/src/presentation/stores";
import {generateUniqueId, getDayIndex} from "@/src/shared/utils";
import {container} from "@/src/shared/containers/container";
import {validateEvent, loadEvents} from ".";

const { eventUseCases } = container


export const updateEvent = async (selectedEvent: IEvent) => {
    const {category, name, description, tasks, start, end, reset} = useEventStore.getState();
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
        await eventUseCases.updateRecurringEvent(selectedEvent.id, eventDate, name, description, category!, start, end, recurringOptions)
    } else if (recurringId) {
        await eventUseCases.updateSingleEvent(date, name, description, category!, start, end, recurringId)
    }

    if (frequency === "once" && recurringId) await eventUseCases.deleteRecurringOptions(recurringId);

    await loadEvents(selectedDate);
    router.back();
    resetRecurring();
    reset();
};