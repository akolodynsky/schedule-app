interface IEvent {
    id: string,
    date: string,
    name: string | null,
    description: string | null,
    category: ICategory,
    start: string,
    end: string,
    recurringId: string | null,
    isRecurring: boolean,
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
    date: string;
    name: string;
    isCompleted: boolean;
}