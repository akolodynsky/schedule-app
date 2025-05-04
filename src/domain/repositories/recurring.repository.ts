import { RecurringOptions } from "@/src/domain/entities";

export interface RecurringRepository {
    getAllByDate(date: string): Promise<RecurringOptions[]>;
    getById(id: string): Promise<RecurringOptions | null>;
    insertOrEdit(recurring: RecurringOptions): Promise<void>;
    delete(id: string): Promise<void>;
    getExceptDays(id: string): Promise<string | null>;
    insertExceptDate(id: string, exceptDate: string): Promise<void>;
}