import {getStoredTasks, saveTasks} from "@/src/storage/tasks/asyncTaskActions";
import {useTaskStore} from "../../presentation/stores";


export const removeTask = async (date: string, id: string, eventId: string) =>  {
    // const tasks = eventId
    //     ? await getStoredEventTasks(date, eventId)
    //     : await getStoredTasks(date);
    //
    // const filteredTasks = tasks.filter((task) => task.id !== id);
    //
    // useTaskStore.getState().updateMergedTasks(date, filteredTasks, eventId);
    //
    // eventId
    //     ? await saveEventWithTasks(date, eventId, filteredTasks)
    //     : await saveTasks(date, filteredTasks);
}