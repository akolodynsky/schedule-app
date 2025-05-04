import {router} from "expo-router";
import {useCategoryStore} from "../../presentation/stores";
import { container } from "@/src/shared/containers/container";

const { categoryUseCases } = container;

export const loadCategories = async () => {
    const categories = await categoryUseCases.getAllCategories();
    useCategoryStore.getState().setCategories(categories);
}

export const createCategory = async () => {
    const {name, color, setError, selectedCategory, reset} = useCategoryStore.getState();

    if (!name) {
        setError("Name is required");
        return;
    }

    if (selectedCategory) {
        await categoryUseCases.updateCategory(selectedCategory.id, name, color);
    } else {
        await categoryUseCases.createCategory(name, color);
    }

    await loadCategories();
    router.back();
    reset();
};

export const removeCategory = async (id: string) => {
    await categoryUseCases.deleteCategory(id);
}

