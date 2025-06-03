import { container } from "@/src/shared/containers/container";


export const updateTaskStore = async (
    tasks: ITaskBlock[],
    updatedTask: ITask,
) => {
    const date = updatedTask.date;
    const eventId = updatedTask.eventId;

    const blocks = [...tasks];
    const blockIndex = blocks.findIndex(block => block.date === date);

    const result = eventId ? await container.eventUseCases.getCategoryAndStartById(eventId) : null;
    const category = result?.category;
    const start = result?.start;


    if (blockIndex === -1) {
        blocks.push({
            date,
            mainTasks: eventId ? [] : [updatedTask],
            eventTasks: eventId ? [{
                id: eventId,
                category: category!,
                start: start!,
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


export const deleteFromTaskStore = (
    tasks: ITaskBlock[],
    taskId: string,
) => {
    const updatedBlocks: ITaskBlock[] = [];

    for (const block of tasks) {
        const filteredMainTasks = block.mainTasks.filter(t => t.id !== taskId);

        const filteredEventTasks = block.eventTasks
            .map(event => ({
                ...event,
                tasks: event.tasks.filter(t => t.id !== taskId)
            }))
            .filter(event => event.tasks.length > 0);

        if (filteredMainTasks.length > 0 || filteredEventTasks.length > 0) {
            updatedBlocks.push({
                ...block,
                mainTasks: filteredMainTasks,
                eventTasks: filteredEventTasks
            });
        }
    }

    return updatedBlocks.sort((a, b) => a.date.localeCompare(b.date));
};
