import {useEventStore} from "../../stores";
import {container} from "@/src/shared/containers/container";


export const loadEvents = async (date: string) => {
    const events = await container.eventUseCases.getAllEventsByDate(date);
    useEventStore.getState().setEvents(events);
}