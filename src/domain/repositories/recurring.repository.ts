import { RecurringOptions } from "@/src/domain/entities";

export interface RecurringRepository {
    getAllByDate(date: string): Promise<RecurringOptions[]>;
    getById(id: string): Promise<RecurringOptions | null>;
    insert(recurring: RecurringOptions): Promise<void>;
    edit(recurring: RecurringOptions): Promise<void>;
    delete(id: string): Promise<void>;
}