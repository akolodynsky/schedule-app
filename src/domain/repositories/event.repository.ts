import { Event } from "../entities/Event";

export interface EventRepository {
    getSingleByDate(date: string): Promise<Event[]>;
    getRecurringByOptions(ids: string[]): Promise<Event[]>;
    getEventId(date: string, recurringId: string, isRecurring: number): Promise<string | null>;
    getTimeByDate(date: string, exceptId?: string): Promise<{ start: string, end: string }[]>;
    insert(event: Omit<Event, "tasksCount">): Promise<void>;
    edit(event: Omit<Event, "tasksCount">): Promise<void>;
    delete(id: string): Promise<void>;
    deleteRecurring(id: string): Promise<void>;
}