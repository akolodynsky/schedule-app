import * as SQLite from "expo-sqlite";
import { RecurringDto } from "@/src/data/dto/RecurringDto";


export class RecurringDatasource {
    private db!: SQLite.SQLiteDatabase;

    constructor() {
        void this.init();
    }

    private async init() {
        this.db = await SQLite.openDatabaseAsync("santitime");
    }

    async getRecurringOptionsByDate(date: string) {
        return await this.db.getAllAsync<RecurringDto>(
            `SELECT * FROM recurring_options
             WHERE start_repeat <= ? AND (end_repeat IS NULL OR end_repeat >= ?)`, date, date
        );
    };

    async getRecurringOptionsById(id: string) {
        return await this.db.getFirstAsync<RecurringDto>(
            `SELECT * FROM recurring_options WHERE id = ?`, id
        );
    };

    async insertRecurringOptions(dto: RecurringDto) {
        await this.db.runAsync(
            'INSERT INTO recurring_options (id, frequency, interval, week_days, month_day, start_repeat, end_repeat) VALUES (?, ?, ?, ?, ?, ?, ?)',
            dto.id, dto.frequency, dto.interval, dto.week_days, dto.month_day, dto.start_repeat, dto.end_repeat
        );
    };

    async editRecurringOptions(dto: RecurringDto) {
        try {
            console.log("dto", dto)
            await this.db.runAsync(
                'UPDATE recurring_options SET frequency = ?, interval = ?, week_days = ?, month_day = ?, start_repeat = ?, end_repeat = ? WHERE id = ?',
                dto.frequency, dto.interval, dto.week_days, dto.month_day, dto.start_repeat, dto.end_repeat, dto.id
            );
        } catch (e) {
            console.error("EditRecurringError: ", e);
        }
    };

    async deleteRecurringOptions(id: string) {
        await this.db.runAsync('DELETE FROM recurring_options WHERE id = ?', id);
    };
}
