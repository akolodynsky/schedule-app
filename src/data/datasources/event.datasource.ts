import * as SQLite from "expo-sqlite";
import {EventDto} from "@/src/data/dto/EventDto";


export class EventDatasource {
    private db!: SQLite.SQLiteDatabase;

    constructor() {
        void this.init();
    }

    private async init() {
        this.db = await SQLite.openDatabaseAsync("santitime");
    }

    async getSingleEventsByDate(date: string) {
        return await this.db.getAllAsync<EventDto>(
            `SELECT events.*,
                    categories.id    AS category_id,
                    categories.name  AS category_name,
                    categories.color AS category_color
             FROM events
             LEFT JOIN categories ON events.category_id = categories.id
             WHERE date = ? AND is_recurring = 0`, date
        );
    };

    async getRecurringEventsByOptions(recurringIds: string[]) {
        const placeholders = recurringIds.map(() => '?').join(', ');
        return await this.db.getAllAsync<EventDto>(
            `SELECT events.*,
                    categories.id    AS category_id,
                    categories.name  AS category_name,
                    categories.color AS category_color
             FROM events
             LEFT JOIN categories ON events.category_id = categories.id
             WHERE recurring_id IN (${placeholders}) AND is_recurring = 1`, recurringIds
        );
    };

    async getEventId(date: string, recurringId: string, isRecurring: number) {
        const result = await this.db.getFirstAsync<{ id: string }>(
            `SELECT id FROM events
             WHERE date = ? AND recurring_id = ?  AND is_recurring = ?`, [date, recurringId, isRecurring]
        );
        return result ? result.id : null;
    };

    async getEventsTimeByDate(date: string, id: string | null) {
        return await this.db.getAllAsync<{ start: string, end: string }>(
            `SELECT start, end FROM events
             WHERE events.date = ? AND events.recurring_id IS NULL AND (? IS NULL OR events.id != ?)`, date, id
        );
    };

    async insertEvent(dto: EventDto) {
        await this.db.runAsync(
            `INSERT INTO events (id, date, name, description, category_id, start, end, is_recurring, recurring_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            dto.id, dto.date, dto.name, dto.description, dto.category_id, dto.start, dto.end, dto.is_recurring, dto.recurring_id
        );
    };

    async editEvent(dto: EventDto) {
        await this.db.runAsync(
            'UPDATE events SET date = ?, name = ?, description = ?, category_id = ?, start = ?, end = ?, is_recurring = ?, recurring_id = ? WHERE id = ?',
            dto.date, dto.name, dto.description, dto.category_id, dto.start, dto.end, dto.is_recurring, dto.recurring_id, dto.id
        );
    };

    async deleteEvent(id: string) {
        await this.db.runAsync('DELETE FROM events WHERE id = ?', id);
    };

    async deleteRecurringEvents(id: string) {
        await this.db.runAsync('DELETE FROM events WHERE recurring_id = ?', id);
    };
}
