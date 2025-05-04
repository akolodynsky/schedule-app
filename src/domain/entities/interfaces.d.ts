interface IEvent {
    id: string,
    date: string,
    name: string | null,
    description: string | null,
    category: ICategory,
    start: string,
    end: string,
    recurringId: string | null,
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
    daysOfWeek: number[] | null,
    dayOfMonth: number | null,
    startRepeat: string,
    endRepeat: string | null,
}

interface ITask {
    id: string;
    date: string;
    name: string;
    isCompleted: boolean;
}