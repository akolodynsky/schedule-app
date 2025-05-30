export class Task {
    public readonly id: string;
    public readonly eventId?: string;
    public readonly date: string;
    public readonly name: string;
    public readonly isCompleted: boolean;

    constructor({
            id,
            eventId,
            date,
            name,
            isCompleted,
        }: Task) {
        this.id = id;
        this.eventId = eventId;
        this.date = date;
        this.name = name;
        this.isCompleted = isCompleted;
    }
}