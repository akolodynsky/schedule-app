import { Event } from "../entities/Event";

export interface EventRepository {
    getSingleByDate(date: string): Promise<Event[]>;
    getRecurringByOptions(ids: string[], date: string): Promise<Event[]>;
    getId(date: string, recurringId: string, isRecurring: number): Promise<string | null>;
    getById(id: string): Promise<Event | null>;
    getTimeByDate(date: string, exceptId?: string): Promise<{ start: string, end: string }[]>;
    insert(event: Omit<Event, "tasksCount">): Promise<void>;
    edit(event: Omit<Event, "tasksCount">): Promise<void>;
    delete(id: string): Promise<void>;
    deleteByRecurringId(id: string, date?: string): Promise<string[]>;
}