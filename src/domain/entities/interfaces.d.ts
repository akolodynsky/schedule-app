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

interface ITaskBlock {
    date: string,
    tasks: ITask[],
}