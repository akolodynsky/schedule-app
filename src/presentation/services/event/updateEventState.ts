import {useDateStore, useEventStore, useRecurringOptionsStore} from "@/src/presentation/stores";
import {container} from "@/src/shared/containers/container";

const { eventUseCases } = container;


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