import {TaskRepository} from "@/src/domain/repositories/task.repository";


export class TaskUseCases {
    constructor(
        private taskRepository: TaskRepository,
    ) {}

    async getAllTasks() {
        const blocksMap = await this.taskRepository.getAll();

        const blocks: ITaskBlock[] = [];

        for (const [date, { mainTasks, eventTasks }] of blocksMap) {
            const events = Array.from(eventTasks.entries()).map(([eventId, data]) => ({
                id: eventId,
                category: data.category,
                tasks: data.tasks,
            }));

            blocks.push({ date, mainTasks, eventTasks: events });
        }

        blocks.sort((a, b) => a.date.localeCompare(b.date))

        return blocks;
    };

    async getTasksByEventId(id: string, date: string) {
        return await this.taskRepository.getByEventId(id, date);
    };

    async createTask(id: string, date: string, name: string, isCompleted: boolean, eventId?: string) {
        await this.taskRepository.insert({id, eventId, date, name, isCompleted});
    };

    async updateTask(id: string, date: string, name: string, isCompleted: boolean, eventId?: string) {
        await this.taskRepository.edit({id, eventId, date, name, isCompleted});
    };

    async deleteTask(id: string) {
        await this.taskRepository.delete(id);
    };

    async deleteTasksByEventId(id: string) {
        await this.taskRepository.deleteByEventId(id);
    };
}