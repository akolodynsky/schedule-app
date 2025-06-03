import { Task } from "@/src/domain/entities";
import { TaskDatasource } from "@/src/data/datasources";
import { TaskRepository } from "@/src/domain/repositories";
import { mapTaskDtoToTask, mapTaskToTaskDto, mapCategoryDtoToCategory } from "@/src/data/mappers";


export class TaskRepositoryImpl implements TaskRepository {
    constructor(private readonly datasource: TaskDatasource) {}

    async getAll() {
        const dtos = await this.datasource.getTasks();

        const blocksMap: ITaskBlockMap = new Map();

        for (const dto of dtos) {
            const date = dto.date;

            if (!blocksMap.has(date)) {
                blocksMap.set(date, {
                    mainTasks: [],
                    eventTasks: new Map(),
                })
            }

            const block = blocksMap.get(date)!;

            const task = mapTaskDtoToTask(dto);

            if (!dto.event_id) {
                block.mainTasks.push(task);
            } else {
                if (!block.eventTasks.has(dto.event_id)) {
                    block.eventTasks.set(dto.event_id, {
                        category: mapCategoryDtoToCategory(dto)!,
                        start: dto.start,
                        tasks: [],
                    });
                }
                block.eventTasks.get(dto.event_id)!.tasks.push(task);
            }
        }

        return blocksMap;
    };

    async getByEventId(id: string, date: string) {
        const dtos = await this.datasource.getTasksByEventId(id, date);
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
        await this.datasource.deleteTasksByEventId(id);
    };
}