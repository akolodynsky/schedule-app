import { EventDto } from "@/src/data/dto/EventDto";
import { Event } from "@/src/domain/entities/Event";

export const mapEventDtoToEvent = (dto: EventDto) => {
    return new Event({
        id: dto.id,
        date: dto.date,
        name: dto.name,
        description: dto.description,
        start: dto.start,
        end: dto.end,
        category: {
            id: dto.category_id,
            name: dto.category_name,
            color: dto.category_color,
        },
        tasksCount: dto.tasks_count,
        isRecurring: !!dto.is_recurring,
        recurringId: dto.recurring_id,
    })
};

export const mapEventToEventDto = (event: Event): EventDto => {
    return {
        id: event.id,
        date: event.date,
        name: event.name,
        description: event.description,
        start: event.start,
        end: event.end,
        category_id: event.category.id,
        category_name: event.category.name,
        category_color: event.category.color,
        tasks_count: event.tasksCount,
        is_recurring: event.isRecurring ? 1 : 0,
        recurring_id: event.recurringId,
    }
};