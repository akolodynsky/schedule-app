import { Task } from "../entities/Task";

export interface TaskRepository {
    getAll(): Promise<TaskBlockMap>;
    getByEventId(id: string, date: string | null): Promise<Task[]>;
    insert(task: Task): Promise<void>;
    edit(task: Task): Promise<void>;
    delete(id: string): Promise<void>;
    deleteByEventId(id: string): Promise<void>;
}