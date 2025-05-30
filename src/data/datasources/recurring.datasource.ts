import * as SQLite from "expo-sqlite";
import {RecurringDto} from "@/src/data/dto/RecurringDto";


export class RecurringDatasource {
    private db!: SQLite.SQLiteDatabase;

    constructor() {
        void this.init();
    };

    private async init() {
        this.db = await SQLite.openDatabaseAsync("santitime", { useNewConnection: true });
    };

    async getRecurringOptionsByDate(date: string) {
        return await this.db.getAllAsync<RecurringDto>(
            `SELECT * FROM recurring_options
             WHERE start_repeat <= ? 
               AND (end_repeat IS NULL OR end_repeat >= ?)
               AND (except_days IS NULL OR ',' || except_days || ',' NOT LIKE ?)
             `, date, date, `%,${date},%`
        );
    };

    async getRecurringOptionsById(id: string) {
        return await this.db.getFirstAsync<RecurringDto>(
            `SELECT * FROM recurring_options WHERE id = ?`, id
        );
    };

    async insertOrEditRecurringOptions(dto: RecurringDto) {
        await this.db.runAsync(
            `INSERT INTO recurring_options (id, frequency, interval, week_days, month_day, start_repeat, end_repeat, except_days)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
             ON CONFLICT(id) DO UPDATE SET
                 frequency = excluded.frequency,
                 interval = excluded.interval,
                 week_days = excluded.week_days,
                 month_day = excluded.month_day,
                 start_repeat = excluded.start_repeat,
                 end_repeat = excluded.end_repeat,
                 except_days = excluded.except_days
            `,
            dto.id, dto.frequency, dto.interval, dto.week_days, dto.month_day, dto.start_repeat, dto.end_repeat, dto.except_days
        );
    };

    async deleteRecurringOptions(id: string) {
        await this.db.runAsync('DELETE FROM recurring_options WHERE id = ?', id);
    };

    async getExceptDays(id: string) {
        const days = await this.db.getFirstAsync<{ except_days: string }>(
            'SELECT except_days FROM recurring_options WHERE id = ?', id
        );
        return days && days.except_days;
    }

    async insertDateToExceptDays(id: string, newDate: string) {
        const exceptDays = await this.getExceptDays(id);

        const dates = (exceptDays || '').split(',').filter(Boolean);
        if (!dates.includes(newDate)) {
            dates.push(newDate);
            const updated = dates.join(',');
            await this.db.runAsync(
                'UPDATE recurring_options SET except_days = ? WHERE id = ?', updated, id
            );
        }
    };
}
