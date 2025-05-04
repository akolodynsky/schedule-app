import {router} from "expo-router";

import {useEventStore, useDateStore, useRecurringOptionsStore} from "../../presentation/stores";
import {checkTimeOverlap, generateUniqueId} from "../../shared/utils";
import {RecurringOptions} from "@/src/domain/entities";
import { container } from "@/src/shared/containers/container";

const { eventUseCases } = container;

export const loadEvents = async (date: string) => {
    const events = await eventUseCases.getAllEventsByDate(date);
    useEventStore.getState().setEvents(events);
}

export const createEvent = async () => {
    const {category, name, description, tasks, start, end, reset} = useEventStore.getState();
    const {frequency, interval, weekDays, endRepeat, resetRecurring} = useRecurringOptionsStore.getState();
    const {selectedDate, date} = useDateStore.getState();

    await validateEvent();

    let recurringOptions: RecurringOptions | null = null;

    if (frequency !== "once") {
        const id = generateUniqueId("r");
        const monthDay = frequency === "monthly" ? new Date(date).getDate() : null;
        recurringOptions = {id, frequency, interval, weekDays, monthDay, startRepeat: date, endRepeat};
    }

    await eventUseCases.createEvent(date, name, description, category!, start, end, recurringOptions)

    await loadEvents(selectedDate);
    router.back();
    resetRecurring();
    reset();
};

export const updateEvent = async (selectedEvent: IEvent) => {
    const {category, name, description, tasks, start, end, reset} = useEventStore.getState();
    const {frequency, interval, weekDays, endRepeat, resetRecurring, disabled} = useRecurringOptionsStore.getState();
    const {selectedDate, date} = useDateStore.getState();

    await validateEvent();

    let recurringOptions: RecurringOptions | null = null;
    const id = selectedEvent.recurringId!;

    if (frequency !== "once") {
        const monthDay = frequency === "monthly" ? new Date(date).getDate() : null;
        recurringOptions = {id, frequency, interval, weekDays, monthDay, startRepeat: date, endRepeat};
    }

    if (!disabled) {
        await eventUseCases.updateRecurringEvent(selectedEvent.id, date, name, description, category!, start, end, recurringOptions)
    } else {
        await eventUseCases.updateSingleEvent(date, name, description, category!, start, end, id)
    }

    await loadEvents(selectedDate);
    router.back();
    resetRecurring();
    reset();
};

export const updateEventState = (selectedEvent: IEvent) => {
    const {setCategory, setName, setDescription, setTasks, setStart, setEnd} = useEventStore.getState();

    setCategory(selectedEvent.category);
    setName(selectedEvent.name!)
    setDescription(selectedEvent.description!)
    // setTasks(selectedEvent.tasks);
    setStart(selectedEvent.start);
    setEnd(selectedEvent.end);
};

export const updateRecurringState = async (id: string) => {
    const {setFrequency, setInterval, setWeekDays, setEndRepeat} = useRecurringOptionsStore.getState();
    const {setDate} = useDateStore.getState();

    const option = await eventUseCases.getRecurringOptionsById(id);

    if (option) {
        setFrequency(option.frequency);
        setInterval(option.interval)
        setWeekDays(option.weekDays)
        setDate(option.startRepeat);
        setEndRepeat(option.endRepeat);
    }
};

export const removeEvent = async (id: string, recurringId: string) => {
    await eventUseCases.deleteEvent(id, recurringId);
};

const validateEvent = async () => {
    const {selectedEvent, category, start, end, setStart, setEnd, setError} = useEventStore.getState();
    const {date} = useDateStore.getState();

    if (!category) {
        setError("Category is required!");
        return;
    }

    const eventsTime = await eventUseCases.getEventsTimeByDate(date, selectedEvent?.id);

    const { isOverlap, maxEndTime } = checkTimeOverlap(start, end, eventsTime);

    if (isOverlap && maxEndTime) {
        setStart(maxEndTime);
        setEnd(maxEndTime);
        setError("Time overload detected!");
        return;
    }
};

