import { Task } from "../entities/Task";
import { TaskBlockMap } from "@/src/data/dto/TaskDto";


export interface TaskRepository {
    getAll(): Promise<TaskBlockMap>;
    getByEventId(id: string): Promise<Task[]>;
    insert(task: Task): Promise<void>;
    edit(task: Task): Promise<void>;
    delete(id: string): Promise<void>;
    deleteByEventId(id: string): Promise<void>;
}