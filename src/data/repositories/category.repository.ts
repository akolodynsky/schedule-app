import { Category } from "@/src/domain/entities";
import { CategoryDatasource } from "@/src/data/datasources";
import { CategoryRepository } from "@/src/domain/repositories";


export class CategoryRepositoryImpl implements CategoryRepository {
    constructor(private readonly datasource: CategoryDatasource) {}

    async getAll() {
        const dtos = await this.datasource.getCategories();
        return dtos as Category[];
    };

    async insert(category: Category) {
        await this.datasource.insertCategory(category);
    };

    async edit(category: Category) {
        await this.datasource.editCategory(category);
    };

    async delete(id: string) {
        await this.datasource.deleteCategory(id);
    };
}