import {container} from "@/src/shared/containers/container";

export const updateTaskStore = async (
    tasks: ITaskBlock[],
    date: string,
    updatedTask: ITask,
    eventId?: string,
) => {
    const blocks = [...tasks];
    const blockIndex = blocks.findIndex(block => block.date === date);

    const { category, start } = eventId ? await container.eventUseCases.getCategoryAndStartById(eventId) : {};

    if (blockIndex === -1) {
        blocks.push({
            date,
            mainTasks: eventId ? [] : [updatedTask],
            eventTasks: eventId && category && start ? [{
                id: eventId,
                category: category,
                start: start,
                tasks: [updatedTask]
            }] : []
        });
    } else {
        const block = { ...blocks[blockIndex] };

        if (eventId) {
            const eventIndex = block.eventTasks.findIndex(e => e.id === eventId);

            if (eventIndex === -1) {
                block.eventTasks.push({
                    id: eventId,
                    category: category!,
                    start: start!,
                    tasks: [updatedTask]
                });

                block.eventTasks.sort((a, b) => a.start.localeCompare(b.start));
            } else {
                const tasks = [...block.eventTasks[eventIndex].tasks];
                const taskIndex = tasks.findIndex(t => t.id === updatedTask.id);
                taskIndex === -1 ? tasks.push(updatedTask) : tasks[taskIndex] = updatedTask;
                block.eventTasks[eventIndex] = { ...block.eventTasks[eventIndex], tasks };
            }
        } else {
            const tasks = [...block.mainTasks];
            const taskIndex = tasks.findIndex(t => t.id === updatedTask.id);
            taskIndex === -1 ? tasks.push(updatedTask) : tasks[taskIndex] = updatedTask;
            block.mainTasks = tasks;
        }

        blocks[blockIndex] = block;
    }

    return blocks.sort((a, b) => a.date.localeCompare(b.date));
};
