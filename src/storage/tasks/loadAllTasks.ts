import AsyncStorage from "@react-native-async-storage/async-storage";

const loadAllTasks = async () => {
    try {
        const allKeys = await AsyncStorage.getAllKeys();

        const eventKeys = allKeys.filter(key => key.startsWith('tasks-'));

        const keyValuePairs = await AsyncStorage.multiGet(eventKeys);

        const parsed = keyValuePairs.map(([key, value]) => ({
            key,
            tasks: value ? JSON.parse(value) : [],
        }));

        return parsed;
    } catch (error) {
        console.error("Failed to load all tasks", error);
    }
}