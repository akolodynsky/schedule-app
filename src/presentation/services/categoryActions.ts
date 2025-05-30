import {router} from "expo-router";
import {useCategoryStore, useEventStore} from "../../presentation/stores";
import {container} from "@/src/shared/containers/container";


export const loadCategories = async () => {
    const categories = await container.categoryUseCases.getAllCategories();
    useCategoryStore.getState().setCategories(categories);
}

export const createCategory = async () => {
    const {name, color, setError, selectedCategory, reset} = useCategoryStore.getState();

    if (!name) {
        setError("Name is required");
        return;
    }

    if (selectedCategory) {
        await container.categoryUseCases.updateCategory(selectedCategory.id, name, color);
    } else {
        const category = await container.categoryUseCases.createCategory(name, color);
        useEventStore.getState().setCategory(category);
    }

    await loadCategories();
    router.back();
    reset();
};

export const removeCategory = async (id: string) => {
    await container.categoryUseCases.deleteCategory(id);
    const eventIds = await container.eventUseCases.deleteEventsByCategoryId(id);

    for (const eventId of eventIds) {
        await container.taskUseCases.deleteTasksByEventId(eventId);
    }
}

