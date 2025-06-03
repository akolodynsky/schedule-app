import { useCategoryStore } from "@/src/presentation/stores";


export const updateCategoryState = (selectedCategory: ICategory) => {
    const {setName, setColor, setSelectedCategory} = useCategoryStore.getState();

    setSelectedCategory(selectedCategory);
    setName(selectedCategory.name);
    setColor(selectedCategory.color);
};