import {getAllStoredTasks} from "../../storage/tasks";


export async function mergeTaskBlocks () {
    // const tasksBlocks = await getAllStoredTasks();
    // const eventsBlocks: IEvent[] = [];
    //
    // if (!tasksBlocks.length && !eventsBlocks.length) return [];
    //
    // const taskMap = new Map<string, ITask[]>(
    //     tasksBlocks.map(tb => [tb.key.replace("tasks-", ""), tb.tasks])
    // );
    //
    // const eventMap = new Map<string, IEvent[]>(
    //     eventsBlocks.map(eb => [eb.key, eb.events])
    // );
    //
    // const allDates = Array.from(new Set([...taskMap.keys(), ...eventMap.keys()])).sort();
    //
    // const merged: MergedTasksBlock[] = [];
    //
    // for (const date of allDates) {
    //     const tasks = taskMap.get(date) ?? [];
    //     const events = (eventMap.get(date) ?? []).sort((a, b) =>
    //         a.start.localeCompare(b.start)
    //     );
    //
    //     const eventsHaveTasks = events.some(event => event.tasks && event.tasks.length > 0);
    //
    //     if (tasks.length === 0 && !eventsHaveTasks) continue;
    //
    //     merged.push({
    //         date,
    //         tasks,
    //         events,
    //     });
    // }
    //
    // return merged;
}