import { create } from 'zustand'


interface CategoryState {
    categories: Category[];
    selectedCategory: Category | undefined;
    name: string,
    color: string,
    error: string,
}

interface CategoryAction {
    setSelectedCategory: (category: Category | undefined) => void;
    setCategories: (categories: Category[]) => void,
    setName: (name: string) => void,
    setColor: (color: string) => void,
    setError: (error: string) => void,
    reset: () => void,
}

const initialState: Omit<CategoryState, "categories"> = {
    selectedCategory: undefined,
    name: "",
    color: "#c6c2c2",
    error: "",
}

export const useCategoryStore = create<CategoryState & CategoryAction>()((set) => ({
    categories: [],
    setCategories: (categories: Category[]) => set({ categories }),

    setSelectedCategory: (category: Category | undefined) => set({ selectedCategory: category }),

    ...initialState,

    setName: (name) => set({ name }),
    setColor: (color) => set({ color }),
    setError: (error) => set({ error }),
    reset: () => {
        set(initialState)
    }
}));