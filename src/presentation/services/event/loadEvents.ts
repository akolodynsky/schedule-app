import {useEventStore} from "../../stores";
import {container} from "@/src/shared/containers/container";

const { eventUseCases } = container


export const loadEvents = async (date: string) => {
    const events = await eventUseCases.getAllEventsByDate(date);
    useEventStore.getState().setEvents(events);
}