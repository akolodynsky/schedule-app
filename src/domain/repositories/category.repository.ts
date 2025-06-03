export interface CategoryRepository {
    getAll(): Promise<ICategory[]>;
    insert(category: ICategory): Promise<void>;
    edit(category: ICategory): Promise<void>;
    delete(id: string): Promise<void>;
}