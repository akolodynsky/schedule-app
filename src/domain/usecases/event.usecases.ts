import {EventRepository} from "@/src/domain/repositories/event.repository";
import {RecurringRepository} from "@/src/domain/repositories/recurring.repository";
import {generateUniqueId} from "@/src/shared/utils";
import {isEventOccurringOnDate} from "@/src/domain/helpers/isEventOccurringOnDate";
import {addGaps} from "@/src/domain/helpers/addGaps";


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
        const recurringEvents = await this.eventRepository.getRecurringByOptions(recurringIds);

        const allEvents = [...events, ...recurringEvents]
            .sort((a, b) => a.start.localeCompare(b.start));
        return addGaps(allEvents);
    };

    async getEventsTimeByDate(date: string, exceptId?: string) {
        return await this.eventRepository.getTimeByDate(date, exceptId);
    };

    async getRecurringOptionsById(id: string) {
        return await this.recurringRepository.getById(id);
    };

    async createEvent(
        id: string,
        date: string,
        name: string,
        description: string,
        category: ICategory,
        start: string,
        end: string,
        recurringOptions: IRecurringOptions | null,
    ) {
        let recurringId: string | null = null;

        if (recurringOptions) {
            recurringId = recurringOptions.id;
            await this.recurringRepository.insertOrEdit(recurringOptions);
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
            const mainId = await this.eventRepository.getEventId(date, recurringId!, 1);
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
        let id = await this.eventRepository.getEventId(date, recurringId, 0);

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

    async deleteRecurringEvents(id: string) {
        await this.eventRepository.deleteRecurring(id);
        await this.recurringRepository.delete(id);
    };

    async deleteRecurringOptions(id: string) {
        await this.recurringRepository.delete(id);
    };
}