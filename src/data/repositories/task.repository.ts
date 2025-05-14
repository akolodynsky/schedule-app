import { Task } from "@/src/domain/entities/Task";
import {TaskDatasource} from "@/src/data/datasources/task.datasource";
import {TaskRepository} from "@/src/domain/repositories/task.repository";
import {mapTaskDtoToTask, mapTaskToTaskDto} from "@/src/data/mappers/task.mapper";


export class TaskRepositoryImpl implements TaskRepository {
    constructor(private readonly datasource: TaskDatasource) {}

    async getAll() {
        const dtos = await this.datasource.getTasks();
        return dtos.map(mapTaskDtoToTask);
    };

    async getByEventId(id: string) {
        const dtos = await this.datasource.getTasksByEventId(id);
        return dtos.map(mapTaskDtoToTask);
    };

    async insert(task: Task) {
        await this.datasource.insertTask(mapTaskToTaskDto(task));
    };

    async edit(task: Task) {
        await this.datasource.editTask(mapTaskToTaskDto(task));
    };

    async delete(id: string) {
        await this.datasource.deleteTask(id);
    };

    async deleteByEventId(id: string) {
        await this.datasource.deleteTaskByEventId(id);
    };
}