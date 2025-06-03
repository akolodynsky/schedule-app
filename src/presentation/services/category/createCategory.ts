import { router } from "expo-router";

import { useCategoryStore, useEventStore } from "@/src/presentation/stores";
import { container } from "@/src/shared/containers/container";
import { validateCategory } from "./validateCategory";
import { loadCategories } from "./loadCategories";


export const createCategory = async () => {
    const {name, color} = useCategoryStore.getState();

    if (await validateCategory()) return;

    const category = await container.categoryUseCases.createCategory(name, color);
    useEventStore.getState().setCategory(category);

    await loadCategories();
    router.back();
};