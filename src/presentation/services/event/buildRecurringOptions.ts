import {generateUniqueId, getDayIndex} from "@/src/shared/utils";
import {useDateStore, useRecurringOptionsStore} from "@/src/presentation/stores";


export const buildRecurringOptions = (recurringId?: string): IRecurringOptions | null => {
    const {frequency, interval, weekDays, endRepeat} = useRecurringOptionsStore.getState();
    const {date} = useDateStore.getState();

    if (frequency === "once") return null;

    const id = recurringId ?? generateUniqueId("r");
    const monthDay = frequency === "monthly" ? new Date(date).getDate() : null;
    const daysOfWeek = weekDays.length === 0 && frequency === "weekly" ? [getDayIndex(date)] : weekDays;

    return {id, frequency, interval, weekDays: daysOfWeek, monthDay, startRepeat: date, endRepeat, exceptDays: null};
}