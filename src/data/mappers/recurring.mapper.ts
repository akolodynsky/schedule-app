import { RecurringOptions } from "@/src/domain/entities";
import { RecurringDto } from "@/src/data/dto";


export const mapRecurringDtoToRecurring = (dto: RecurringDto) => {
    return new RecurringOptions({
        id: dto.id,
        frequency: dto.frequency,
        interval: dto.interval,
        weekDays: dto.week_days ? JSON.parse(dto.week_days) as number[]: [],
        monthDay: dto.month_day,
        startRepeat: dto.start_repeat,
        endRepeat: dto.end_repeat,
        exceptDays: dto.except_days
    })
};

export const mapRecurringToRecurringDto = (recurring: RecurringOptions): RecurringDto => {
    return {
        id: recurring.id,
        frequency: recurring.frequency,
        interval: recurring.interval,
        week_days: recurring.weekDays.length > 0 ? JSON.stringify(recurring.weekDays) : null,
        month_day: recurring.monthDay,
        start_repeat: recurring.startRepeat,
        end_repeat: recurring.endRepeat,
        except_days: recurring.exceptDays
    }
};