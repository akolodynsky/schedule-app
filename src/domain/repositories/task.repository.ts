import { Task } from "../entities/Task";

export interface TaskRepository {
    getAll(): Promise<Task[]>;
    getByEventId(id: string): Promise<Task[]>;
    insert(task: Task): Promise<void>;
    edit(task: Task): Promise<void>;
    delete(id: string): Promise<void>;
}