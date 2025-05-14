import {router} from "expo-router";

import {useDateStore, useEventStore, useRecurringOptionsStore} from "@/src/presentation/stores";
import {generateUniqueId, getDayIndex} from "@/src/shared/utils";
import {RecurringOptions} from "@/src/domain/entities";
import { validateEvent } from "./validateEvent";
import { loadEvents } from "./loadEvents";
import {container} from "@/src/shared/containers/container";


export const createEvent = async () => {
    const {category, name, description, start, tasks, end, reset} = useEventStore.getState();
    const {frequency, interval, weekDays, endRepeat, resetRecurring} = useRecurringOptionsStore.getState();
    const {selectedDate, date} = useDateStore.getState();

    if (await validateEvent()) return;

    let recurringOptions: RecurringOptions | null = null;

    if (frequency !== "once") {
        const id = generateUniqueId("r");
        const monthDay = frequency === "monthly" ? new Date(date).getDate() : null;
        const daysOfWeek = weekDays.length === 0 && frequency === "weekly" ? [getDayIndex(date)] : weekDays;
        recurringOptions = {id, frequency, interval, weekDays: daysOfWeek, monthDay, startRepeat: date, endRepeat, exceptDays: null};
    }

    const id = generateUniqueId("e");

    await container.eventUseCases.createEvent(id, date, name, description, category!, start, end, recurringOptions);

    if (tasks && tasks.length > 0) {
        tasks.map(async (task) => {
            await container.taskUseCases.createTask(task.id, task.date, task.name, task.isCompleted, id);
        });
    }

    await loadEvents(selectedDate);
    router.back();
    resetRecurring();
    reset();
};