import { useCategoryStore } from "@/src/presentation/stores";
import { container } from "@/src/shared/containers/container";


export const loadCategories = async () => {
    const categories = await container.categoryUseCases.getAllCategories();
    useCategoryStore.getState().setCategories(categories);
}