import {EventRepository} from "@/src/domain/repositories/event.repository";
import {EventDatasource} from "@/src/data/datasources/event.datasource";
import {mapEventDtoToEvent, mapEventToEventDto} from "@/src/data/mappers/event.mapper";
import { Event } from "@/src/domain/entities/Event";

export class EventRepositoryImpl implements EventRepository {
    constructor(
        private readonly datasource: EventDatasource
    ) {}

    async getSingleByDate(date: string) {
        const dtos = await this.datasource.getSingleEventsByDate(date);
        return dtos.map(mapEventDtoToEvent);
    };

    async getRecurringByOptions(ids: string[]) {
        const dtos = await this.datasource.getRecurringEventsByOptions(ids);
        return dtos.map(mapEventDtoToEvent);
    };

    async getSingleId(date: string, recurringId: string) {
        return await this.datasource.getSingleEventId(date, recurringId);
    };

    async getTimeByDate(date: string, exceptId?: string) {
        return await this.datasource.getEventsTimeByDate(date, exceptId || null);
    };

    async insert(event: Event) {
        await this.datasource.insertEvent(mapEventToEventDto(event));
    };

    async edit(event: Event) {
        await this.datasource.editEvent(mapEventToEventDto(event));
    }

    async delete(id: string) {
        await this.datasource.deleteEvent(id);
    }
}