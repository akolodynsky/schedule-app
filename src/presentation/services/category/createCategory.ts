import {useCategoryStore, useEventStore} from "@/src/presentation/stores";
import {validateCategory} from "./validateCategory";
import {loadCategories} from "./loadCategories";
import {container} from "@/src/shared/containers/container";


export const createCategory = async (handleBack: () => void) => {
    const {name, color} = useCategoryStore.getState();

    if (await validateCategory()) return;

    const category = await container.categoryUseCases.createCategory(name, color);
    useEventStore.getState().setCategory(category);

    await loadCategories();
    handleBack();
};