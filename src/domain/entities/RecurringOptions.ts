export type Frequency = 'daily' | 'weekly' | 'monthly';

export class RecurringOptions {
    public readonly id: string
    public readonly frequency: Frequency
    public readonly interval: number
    public readonly weekDays: number[] | null
    public readonly monthDay: number | null
    public readonly startRepeat: string
    public readonly endRepeat: string | null

    constructor({
        id,
        frequency,
        interval,
        weekDays,
        monthDay,
        startRepeat,
        endRepeat
    }: RecurringOptions) {
        this.id = id;
        this.frequency = frequency;
        this.interval = interval;
        this.weekDays = weekDays;
        this.monthDay = monthDay;
        this.startRepeat = startRepeat;
        this.endRepeat = endRepeat;
    }
}