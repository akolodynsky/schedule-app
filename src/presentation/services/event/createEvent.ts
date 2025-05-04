import {router} from "expo-router";

import {useDateStore, useEventStore, useRecurringOptionsStore} from "@/src/presentation/stores";
import {container} from "@/src/shared/containers/container";
import {generateUniqueId, getDayIndex} from "@/src/shared/utils";
import {RecurringOptions} from "@/src/domain/entities";
import {validateEvent, loadEvents} from ".";

const { eventUseCases } = container;


export const createEvent = async () => {
    const {category, name, description, tasks, start, end, reset} = useEventStore.getState();
    const {frequency, interval, weekDays, endRepeat, resetRecurring} = useRecurringOptionsStore.getState();
    const {selectedDate, date} = useDateStore.getState();

    await validateEvent();

    let recurringOptions: RecurringOptions | null = null;

    if (frequency !== "once") {
        const id = generateUniqueId("r");
        const monthDay = frequency === "monthly" ? new Date(date).getDate() : null;
        const daysOfWeek = weekDays.length === 0 && frequency === "weekly" ? [getDayIndex(date)] : weekDays;
        recurringOptions = {id, frequency, interval, weekDays: daysOfWeek, monthDay, startRepeat: date, endRepeat, exceptDays: null};
    }

    await eventUseCases.createEvent(date, name, description, category!, start, end, recurringOptions)

    await loadEvents(selectedDate);
    router.back();
    resetRecurring();
    reset();
};