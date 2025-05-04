import {useDateStore, useEventStore} from "@/src/presentation/stores";
import {checkTimeOverlap} from "@/src/shared/utils";
import {container} from "@/src/shared/containers/container";

const { eventUseCases } = container;


export const validateEvent = async () => {
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