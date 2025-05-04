import {useTaskStore} from "../../presentation/stores";
import {getAllStoredTasks} from "@/src/storage/tasks/asyncTaskActions";


export const loadTasks = async () => {
    const tasksBlocks = await getAllStoredTasks();
    
};