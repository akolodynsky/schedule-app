export interface RecurringRepository {
    getAllByDate(date: string): Promise<IRecurringOptions[]>;
    getById(id: string): Promise<IRecurringOptions | null>;
    insertOrEdit(recurring: IRecurringOptions): Promise<void>;
    delete(id: string): Promise<void>;
    getExceptDays(id: string): Promise<string | null>;
    insertExceptDate(id: string, exceptDate: string): Promise<void>;
}