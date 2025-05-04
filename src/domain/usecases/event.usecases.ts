import {EventRepository} from "@/src/domain/repositories/event.repository";
import {RecurringRepository} from "@/src/domain/repositories/recurring.repository";
import {RecurringOptions} from "@/src/domain/entities";
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
        console.log("events", events)
        const recurringOptions = await this.recurringRepository.getAllByDate(date);
        const recurringIds = recurringOptions
            .filter(option => isEventOccurringOnDate(option, date, events))
            .map(option => option.id);
        console.log("recurringIds", recurringIds)

        const recurringEvents = await this.eventRepository.getRecurringByOptions(recurringIds);
        console.log("recurringEvents", recurringEvents)
        const allEvents = [...events, ...recurringEvents]
            .sort((a, b) => a.start.localeCompare(b.start));
        console.log("allEvents", allEvents)
        return addGaps(allEvents);
    };

    async getEventsTimeByDate(date: string, expectId?: string) {
        return await this.eventRepository.getTimeByDate(date, expectId);
    };

    async getRecurringOptionsById(id: string) {
        return await this.recurringRepository.getById(id);
    };

    async createEvent(
        date: string,
        name: string,
        description: string,
        category: ICategory,
        start: string,
        end: string,
        recurringOptions: RecurringOptions | null,
    ) {
        let recurringId: string | null = null;

        if (recurringOptions) {
            recurringId = recurringOptions.id;
            await this.recurringRepository.insert(recurringOptions);
        }

        const id = generateUniqueId("e");
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
        recurringOptions: RecurringOptions | null,
    ) {
        const recurringId = recurringOptions?.id ?? null;

        if (recurringOptions) {
            await this.recurringRepository.edit(recurringOptions);
        }

        const isRecurring = !!recurringOptions;

        await this.eventRepository.edit({id, date, name, description, category, start, end, isRecurring, recurringId});
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

        const id = await this.eventRepository.getSingleId(date, recurringId);

        if (id) {
            console.log(id)
            await this.eventRepository.edit({id, date, name, description, category, start, end, isRecurring: false, recurringId});
        } else {
            const id = generateUniqueId("e");
            await this.eventRepository.insert({id, date, name, description, category, start, end, isRecurring: false, recurringId});
        }
    };

    async deleteEvent(id: string, recurringId: string) {
        await this.eventRepository.delete(id);

        if (recurringId) {
            await this.recurringRepository.delete(recurringId);
        }
    };
}