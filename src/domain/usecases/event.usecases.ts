import { EventRepository } from "@/src/domain/repositories";
import { RecurringRepository } from "@/src/domain/repositories";
import { generateUniqueId, addGaps, isEventOccurringOnDate } from "@/src/shared/utils";


export class EventUseCases {
    constructor(
        private eventRepository: EventRepository,
        private recurringRepository: RecurringRepository,
    ) {}

    async getAllEventsByDate(date: string) {
        const events = await this.eventRepository.getSingleByDate(date);
        const recurringOptions = await this.recurringRepository.getAllByDate(date);

        const recurringIds = recurringOptions
            .filter(option => isEventOccurringOnDate(option, date))
            .map(option => option.id);
        const recurringEvents = await this.eventRepository.getRecurringByOptions(recurringIds, date);

        const allEvents = [...events, ...recurringEvents]
            .sort((a, b) => a.start.localeCompare(b.start));
        return addGaps(allEvents);
    };

    async getEventsTimeByDate(date: string, exceptId?: string) {
        return await this.eventRepository.getTimeByDate(date, exceptId);
    };

    async getCategoryAndStartById(id: string) {
        return await this.eventRepository.getCategoryAndStartById(id);
    };

    async getRecurringOptionsById(id: string) {
        return await this.recurringRepository.getById(id);
    };

    async getEventById(id: string) {
        return await this.eventRepository.getById(id);
    };

    async createEvent(
        id: string,
        date: string,
        name: string,
        description: string,
        category: ICategory,
        start: string,
        end: string,
        recurringOptions: Omit<IRecurringOptions, "exceptDays"> | null,
    ) {
        let recurringId: string | null = null;

        if (recurringOptions) {
            recurringId = recurringOptions.id;
            await this.recurringRepository.insertOrEdit({...recurringOptions, exceptDays: null});
        }

        const isRecurring = !!recurringOptions;

        await this.eventRepository.insert({id, date, name, description, category, start, end, isRecurring, recurringId});
    };

    async updateRecurringEvent(
        id: string,
        date: string,
        name: string,
        description: string,
        category: ICategory,
        start: string,
        end: string,
        recurringOptions: Omit<IRecurringOptions, "exceptDays"> | null,
    ) {
        let eventId = id;
        const recurringId = recurringOptions?.id ?? null;

        if (recurringOptions) {
            const exceptDays = await this.recurringRepository.getExceptDays(recurringId!);
            await this.recurringRepository.insertOrEdit({...recurringOptions, exceptDays});
            const mainId = await this.eventRepository.getId(date, recurringId!, 1);
            eventId = mainId ? mainId : id;
        }

        const isRecurring = !!recurringOptions;
        await this.eventRepository.edit({id: eventId, date, name, description, category, start, end, isRecurring, recurringId});

        return eventId;
    };

    async updateSingleEvent(
        date: string,
        name: string,
        description: string,
        category: ICategory,
        start: string,
        end: string,
        recurringId: string,
    ) {
        let id = await this.eventRepository.getId(date, recurringId, 0);

        await this.recurringRepository.insertExceptDate(recurringId, date);

        if (id) {
            await this.eventRepository.edit({id, date, name, description, category, start, end, isRecurring: false, recurringId});
        } else {
            id = generateUniqueId("e");
            await this.eventRepository.insert({id, date, name, description, category, start, end, isRecurring: false, recurringId});
        }

        return id;
    };

    async deleteSingleEvent(id: string, date: string) {
        if (id.startsWith("r")) {
            await this.recurringRepository.insertExceptDate(id, date);
        } else {
            await this.eventRepository.delete(id);
        }
    };

    async deleteRecurringOptions(id: string, date?: string) {
        await this.recurringRepository.delete(id);
        return await this.eventRepository.deleteByRecurringId(id, date);
    };

    async deleteEventsByCategoryId(id: string) {
        return await this.eventRepository.deleteByCategoryId(id);
    };
}