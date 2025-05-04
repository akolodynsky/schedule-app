import {RecurringOptions} from "@/src/domain/entities";

export function isEventOccurringOnDate(option: RecurringOptions, date: string, events: IEvent[]) {
    if (events.length > 0) {
        return events.some(e => e.recurringId !== option.id);
    }

    const current = new Date(date);
    const start = new Date(option.startRepeat);

    const diffInDays = Math.floor((+current - +start) / (1000 * 60 * 60 * 24));

    switch (option.frequency) {
        case "daily":
            return diffInDays % option.interval === 0;

        case "weekly":
            const weekday = current.getDay();
            const weekdayIndex = weekday === 0 ? 6 : weekday - 1;
            return option.weekDays?.includes(weekdayIndex) && Math.floor(diffInDays / 7) % option.interval === 0;

        case "monthly":
            const monthDiff = (current.getFullYear() - start.getFullYear()) * 12 + (current.getMonth() - start.getMonth());
            return current.getDate() === option.monthDay && monthDiff % option.interval === 0;

        default:
            return false;
    }
}