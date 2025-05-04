import { Category } from "../entities/Category";

export interface CategoryRepository {
    getAll(): Promise<Category[]>;
    insert(category: Category): Promise<void>;
    edit(category: Category): Promise<void>;
    delete(id: string): Promise<void>;
}