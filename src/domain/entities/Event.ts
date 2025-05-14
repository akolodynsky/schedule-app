import { Category } from "./Category";

export class Event {
    public readonly id: string;
    public readonly date: string;
    public readonly name: string | null;
    public readonly description: string | null;
    public readonly category: Category;
    public readonly tasksCount: number;
    public readonly start: string;
    public readonly end: string;
    public readonly isRecurring: boolean;
    public readonly recurringId: string | null;

    constructor({
        id,
        date,
        name,
        description,
        start,
        end,
        category,
        tasksCount,
        isRecurring,
        recurringId
    }: Event) {
        this.id = id;
        this.date = date;
        this.name = name;
        this.description = description;
        this.start = start;
        this.end = end;
        this.category = category;
        this.tasksCount = tasksCount;
        this.isRecurring = isRecurring;
        this.recurringId = recurringId;
    }
}
