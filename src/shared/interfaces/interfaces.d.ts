interface IEvent {
    id: string,
    date: string,
    name: string | null,
    description: string | null,
    category: ICategory,
    tasksCount: number,
    start: string,
    end: string,
    recurringId: string | null,
    isRecurring: boolean,
}

interface IGap {
    id: string;
    start: string;
    end: string;
}

interface ICategory  {
    id: string,
    name: string,
    color: string,
}

interface IRecurringOptions {
    id: string,
    frequency: "daily" | "weekly" | "monthly",
    interval: number,
    weekDays: number[],
    monthDay: number | null,
    startRepeat: string,
    endRepeat: string | null,
    exceptDays: string | null,
}

interface ITask {
    id: string;
    eventId?: string;
    date: string;
    name: string;
    isCompleted: boolean;
}

type TaskBlockMap = Map<string, {
    mainTasks: ITask[],
    eventTasks: Map<string, { category: ICategory, start: string, tasks: ITask[] }>
}>;

interface ITaskBlock {
    date: string,
    mainTasks: ITask[],
    eventTasks: {
        id: string,
        category: ICategory,
        start: string,
        tasks: ITask[],
    }[];
}

interface Day {
    date: string,
    day: string,
}


