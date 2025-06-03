import { Task } from "@/src/domain/entities";
import { TaskDto } from "@/src/data/dto";


export const mapTaskDtoToTask = (dto: TaskDto) => {
    return new Task({
        id: dto.id,
        eventId: dto.event_id!,
        date: dto.date,
        name: dto.name,
        isCompleted: !!dto.is_completed,
    })
};

export const mapTaskToTaskDto = (task: Task): TaskDto => {
    return {
        id: task.id,
        event_id: task.eventId!,
        date: task.date,
        name: task.name,
        is_completed: task.isCompleted ? 1 : 0,
    }
};