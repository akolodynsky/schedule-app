import {useTaskStore} from "@/src/presentation/stores";


export const validateTask = async () => {
    const {setError, name} = useTaskStore.getState();

    if (!name) {
        setError("Name is required!");
        return;
    }
};