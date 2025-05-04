import AsyncStorage from "@react-native-async-storage/async-storage";


export const getAllStoredTasks = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const dateKeys = keys.filter(key => key.startsWith("tasks"));
        const allStoredEvents = await AsyncStorage.multiGet(dateKeys);

        const tasksBlocks: TasksBlock[] = [];

        const keysToDelete: string[] = [];

        for (const [key, value] of allStoredEvents) {
            if (!value) {
                keysToDelete.push(key);
                continue;
            }

            const tasks: ITask[] = JSON.parse(value);

            if (!Array.isArray(tasks) || tasks.length === 0) {
                keysToDelete.push(key);
                continue;
            }

            tasksBlocks.push({ key, tasks });
        }

        if (keysToDelete.length > 0) {
            await AsyncStorage.multiRemove(keysToDelete);
        }

        return tasksBlocks;
    } catch (error) {
        console.error("Error getting all tasks: ", error);
        return [];
    }
};

export const getStoredTasks = async (date: string): Promise<ITask[]> => {
    try {
        const storedEvents = await AsyncStorage.getItem("tasks-" + date);
        return storedEvents ? JSON.parse(storedEvents) : [];
    } catch (error) {
        console.error("Error getting tasks: ", error);
        return [];
    }
};

export const saveTasks = async (date: string, tasks: ITask[]) => {
    try {
        await AsyncStorage.setItem("tasks-" + date, JSON.stringify(tasks));
    } catch (error) {
        console.error("Error saving tasks: ", error);
    }

}