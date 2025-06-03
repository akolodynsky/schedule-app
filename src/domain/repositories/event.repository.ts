export interface EventRepository {
    getSingleByDate(date: string): Promise<IEvent[]>;
    getRecurringByOptions(ids: string[], date: string): Promise<IEvent[]>;
    getId(date: string, recurringId: string, isRecurring: number): Promise<string | null>;
    getById(id: string): Promise<IEvent | null>;
    getTimeByDate(date: string, exceptId?: string): Promise<{ start: string, end: string }[]>;
    getCategoryAndStartById(id: string): Promise<{category: ICategory, start: string} | null>;
    insert(event: Omit<IEvent, "tasksCount">): Promise<void>;
    edit(event: Omit<IEvent, "tasksCount">): Promise<void>;
    delete(id: string): Promise<void>;
    deleteByRecurringId(id: string, date?: string): Promise<string[]>;
    deleteByCategoryId(id: string): Promise<string[]>;
}