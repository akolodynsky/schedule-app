export class Task {
    public readonly id: string;
    public readonly date: string;
    public readonly name: string;
    public readonly isCompleted: boolean;

    constructor({
                    id,
                    date,
                    name,
                    isCompleted,
                }: Task) {
        this.id = id;
        this.date = date;
        this.name = name;
        this.isCompleted = isCompleted;
    }
}