import { useEventStore } from "@/src/presentation/stores";
import { container } from "@/src/shared/containers/container";


export const loadEvents = async (date: string) => {
    const events = await container.eventUseCases.getAllEventsByDate(date);
    useEventStore.getState().setEvents(events);
}

export const getEventById = async (id: string) => {
    const event = await container.eventUseCases.getEventById(id);
    useEventStore.getState().setSelectedEvent(event);
};