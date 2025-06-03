import { router } from "expo-router";

import { useDateStore, useEventStore, useTaskStore } from "@/src/presentation/stores";
import { container } from "@/src/shared/containers/container";
import { buildRecurringOptions } from "./buildRecurringOptions";
import { validateEvent } from "./validateEvent";
import { loadEvents } from "./loadEvents";
import { generateUniqueId } from "@/src/shared/utils";


export const createEvent = async () => {
    const {category, name, description, start, tasks, end} = useEventStore.getState();
    const {date, setSelectedDate} = useDateStore.getState();

    if (await validateEvent()) return;

    const recurringOptions = buildRecurringOptions();

    const id = generateUniqueId("e");

    await container.eventUseCases.createEvent(id, date, name, description, category!, start, end, recurringOptions);

    if (tasks.length > 0) {
        await Promise.all(tasks.map(task => {
            container.taskUseCases.createTask(task.id, task.date, task.name, task.isCompleted, id);
        }))

        await new Promise((res) => setTimeout(res, 25));

        useTaskStore.getState().setShouldReloadTasks(true);
    }

    setSelectedDate(date);
    await loadEvents(date);
    router.back();
};