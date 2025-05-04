import {getStoredTasks, saveTasks} from "@/src/storage/tasks/asyncTaskActions";


import {generateUniqueId} from "../../shared/utils";
import {useTaskStore} from "../../presentation/stores";


export const createTask = async (name: string, isCompleted: boolean, date: string, selectedId?: string, eventId?: string) =>  {
    // //const tasks = eventId? await getStoredEventTasks(date, eventId): await getStoredTasks(date);
    //
    // const existingTaskIndex = tasks.findIndex(task => task.id === selectedId);
    // let updatedTasks;
    //
    // if (selectedId && existingTaskIndex !== -1) {
    //     updatedTasks = tasks.map(task => (
    //         task.id === selectedId
    //             ? { ...task, date: date, name: name, isCompleted: isCompleted }
    //             : task
    //     ))
    // } else {
    //     const newTask: ITask = {
    //         id: selectedId ?? generateUniqueId("t"),
    //         date: date,
    //         name: name,
    //         isCompleted: isCompleted,
    //     };
    //     updatedTasks = [...tasks, newTask];
    // }
    //
    // useTaskStore.getState().updateMergedTasks(date, updatedTasks, eventId);
    //
    // eventId
    //     ? await saveEventWithTasks(date, eventId, updatedTasks)
    //     : await saveTasks(date, updatedTasks);
}