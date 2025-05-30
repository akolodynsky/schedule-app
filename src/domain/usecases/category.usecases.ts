import {generateUniqueId} from "@/src/shared/utils";
import {CategoryRepository} from "@/src/domain/repositories/category.repository";


export class CategoryUseCases {
    constructor(
        private categoryRepository: CategoryRepository,
    ) {}

    async getAllCategories() {
        return await this.categoryRepository.getAll();
    };

    async createCategory(name: string, color: string,) {
        const id = generateUniqueId("c");
        await this.categoryRepository.insert({id, name, color});
        return {id, name, color};
    };

    async updateCategory(id: string, name: string, color: string,) {
        await this.categoryRepository.edit({id, name, color});
    };

    async deleteCategory(id: string) {
        await this.categoryRepository.delete(id);
    };
}