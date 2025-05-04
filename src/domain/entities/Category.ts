export class Category {
    public readonly id: string
    public readonly name: string
    public readonly color: string

    constructor({
        id,
        name,
        color,
    }: Category) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}