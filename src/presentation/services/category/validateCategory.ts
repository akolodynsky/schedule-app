import { useCategoryStore } from "@/src/presentation/stores";


export const validateCategory = async () => {
    const {setError, name} = useCategoryStore.getState();

    if (!name) {
        setError("Name is required!");
        return true;
    }

    return false;
};