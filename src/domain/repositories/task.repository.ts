export interface TaskRepository {
    getAll(): Promise<ITaskBlockMap>;
    getByEventId(id: string, date: string | null): Promise<ITask[]>;
    insert(task: ITask): Promise<void>;
    edit(task: ITask): Promise<void>;
    delete(id: string): Promise<void>;
    deleteByEventId(id: string): Promise<void>;
}