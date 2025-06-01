import {useCategoryStore, useDateStore, useEventStore, useTaskStore} from "@/src/presentation/stores";
import {container} from "@/src/shared/containers/container";


export const updateCategoryState = (selectedCategory: ICategory) => {
    const {setName, setColor, setSelectedCategory} = useCategoryStore.getState();

    setSelectedCategory(selectedCategory);
    setName(selectedCategory.name);
    setColor(selectedCategory.color);
};