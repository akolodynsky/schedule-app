import {router} from "expo-router";

import {useDateStore, useEventStore, useRecurringOptionsStore, useTaskStore} from "@/src/presentation/stores";
import {generateUniqueId} from "@/src/shared/utils";
import { validateEvent } from "./validateEvent";
import { loadEvents } from "./loadEvents";
import {container} from "@/src/shared/containers/container";
import {buildRecurringOptions} from "@/src/presentation/services/event/buildRecurringOptions";


export const createEvent = async () => {
    const {category, name, description, start, tasks, end, reset} = useEventStore.getState();
    const {resetRecurring} = useRecurringOptionsStore.getState();
    const {selectedDate, date, setSelectedDate} = useDateStore.getState();

    if (await validateEvent()) return;

    const recurringOptions = buildRecurringOptions();

    const id = generateUniqueId("e");

    await container.eventUseCases.createEvent(id, date, name, description, category!, start, end, recurringOptions);

    if (tasks.length > 0) {
        tasks.map(async (task) => {
            await container.taskUseCases.createTask(task.id, task.date, task.name, task.isCompleted, id);
        });
        useTaskStore.getState().setShouldReloadTasks(true);
    }

    await loadEvents(selectedDate);
    router.back();
    setSelectedDate(date);
    resetRecurring();
    reset();
};