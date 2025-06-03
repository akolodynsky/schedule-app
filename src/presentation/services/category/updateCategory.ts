import { router } from "expo-router";

import { useCategoryStore } from "@/src/presentation/stores";
import { container } from "@/src/shared/containers/container";
import { validateCategory } from "./validateCategory";
import { loadCategories } from "./loadCategories";


export const updateCategory = async (id: string) => {
    const {name, color} = useCategoryStore.getState();

    if (await validateCategory()) return;

    await container.categoryUseCases.updateCategory(id, name, color);
    await loadCategories();

    router.back();
};