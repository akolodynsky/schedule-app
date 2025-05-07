import { TaskDto } from "@/src/data/dto/TaskDto";
import { Task } from "@/src/domain/entities/Task";

export const mapTaskDtoToTask = (dto: TaskDto) => {
    return new Task({
        id: dto.id,
        date: dto.date,
        name: dto.name,
        isCompleted: !!dto.is_completed,
    })
};

export const mapTaskToTaskDto = (task: Task): TaskDto => {
    return {
        id: task.id,
        date: task.date,
        name: task.name,
        is_completed: task.isCompleted ? 1 : 0,
    }
};