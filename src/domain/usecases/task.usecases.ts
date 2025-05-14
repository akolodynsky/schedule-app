import {TaskRepository} from "@/src/domain/repositories/task.repository";
import {Task} from "@/src/domain/entities/Task";


export class TaskUseCases {
    constructor(
        private taskRepository: TaskRepository,
    ) {}

    async getAllTasks(): Promise<ITaskBlock[]> {
        const tasks = await this.taskRepository.getAll();

        const tasksMap = tasks.reduce((map, task) => {
            if (!map.has(task.date)) {
                map.set(task.date, []);
            }
            map.get(task.date)!.push(task);
            return map;
        }, new Map<string, Task[]>());

        return Array.from(tasksMap.entries()).map(([date, tasks]) => ({
            date,
            tasks,
        }));
    };

    async getTasksByEventId(id: string) {
        return await this.taskRepository.getByEventId(id);
    };

    async createTask(id: string, date: string, name: string, eventId?: string) {
        await this.taskRepository.insert({id, eventId, date, name, isCompleted: false});
    };

    async updateTask(id: string, date: string, name: string, isCompleted: boolean) {
        await this.taskRepository.edit({id, date, name, isCompleted});
    };

    async deleteTask(id: string) {
        await this.taskRepository.delete(id);
    };
}