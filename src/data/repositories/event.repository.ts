import { Event } from "@/src/domain/entities";
import { EventDatasource } from "@/src/data/datasources";
import { EventRepository } from "@/src/domain/repositories";
import { mapEventDtoToEvent, mapEventToEventDto, mapCategoryDtoToCategory } from "@/src/data/mappers";


export class EventRepositoryImpl implements EventRepository {
    constructor(
        private readonly datasource: EventDatasource
    ) {}

    async getSingleByDate(date: string) {
        const dtos = await this.datasource.getSingleEventsByDate(date);
        return dtos.map(mapEventDtoToEvent);
    };

    async getRecurringByOptions(ids: string[], date: string) {
        const dtos = await this.datasource.getRecurringEventsByOptions(ids, date);
        return dtos.map(mapEventDtoToEvent);
    };

    async getId(date: string, recurringId: string, isRecurring: number) {
        const dto = await this.datasource.getEventId(date, recurringId, isRecurring);
        return dto && dto.id;
    };

    async getById(id: string) {
        const dto = await this.datasource.getEventById(id);
        return dto ? mapEventDtoToEvent(dto) : null;
    };

    async getTimeByDate(date: string, exceptId?: string) {
        return await this.datasource.getEventsTimeByDate(date, exceptId || null);
    };

    async getCategoryAndStartById(id: string) {
        const dto = await this.datasource.getCategoryAndStartByEventId(id);
        return dto ? {category: mapCategoryDtoToCategory(dto), start: dto.start} : null;
    };

    async insert(event: Event) {
        await this.datasource.insertEvent(mapEventToEventDto(event));
    };

    async edit(event: Event) {
        await this.datasource.editEvent(mapEventToEventDto(event));
    };

    async delete(id: string) {
        await this.datasource.deleteEvent(id);
    };

    async deleteByRecurringId(id: string, date?: string) {
        const dtos = await this.datasource.deleteEventsByRecurringId(id, date);
        return dtos.map(dto => dto.id);
    };

    async deleteByCategoryId(id: string) {
        const dtos = await this.datasource.deleteEventsByCategoryId(id);
        return dtos.map(dto => dto.id);
    };
}