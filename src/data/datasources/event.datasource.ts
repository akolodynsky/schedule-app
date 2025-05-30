import * as SQLite from "expo-sqlite";
import {EventCategoryAndStartDto, EventDto} from "@/src/data/dto/EventDto";
import {TaskWithCategoryAndStartDto} from "@/src/data/dto/TaskDto";


export class EventDatasource {
    private db!: SQLite.SQLiteDatabase;

    constructor() {
        void this.init();
    };

    private async init() {
        this.db = await SQLite.openDatabaseAsync("santitime", { useNewConnection: true });
    };

    async getSingleEventsByDate(date: string) {
        return await this.db.getAllAsync<EventDto>(
            `SELECT events.*,
                categories.name  AS category_name,
                categories.color AS category_color,
                (
                    SELECT COUNT(*)
                    FROM tasks
                    WHERE tasks.event_id = events.id AND tasks.date = ?
                ) AS tasks_count
         FROM events
         LEFT JOIN categories ON events.category_id = categories.id
         WHERE date = ? AND is_recurring = 0`, date, date
        );
    };

    async getRecurringEventsByOptions(recurringIds: string[], date: string) {
        if (recurringIds.length === 0) return [];

        const placeholders = recurringIds.map(() => '?').join(', ');
        return await this.db.getAllAsync<EventDto>(
            `SELECT events.*,
                categories.name  AS category_name,
                categories.color AS category_color,
                (   
                    SELECT COUNT(*)
                    FROM tasks
                    WHERE tasks.event_id = events.id AND tasks.date = ?
                ) AS tasks_count
         FROM events
         LEFT JOIN categories ON events.category_id = categories.id
         WHERE recurring_id IN (${placeholders}) AND is_recurring = 1`, [date, ...recurringIds]
        );
    };

    async getEventId(date: string, recurringId: string, isRecurring: number) {
        const result = await this.db.getFirstAsync<{ id: string }>(
            `SELECT id FROM events
             WHERE date = ? AND recurring_id = ?  AND is_recurring = ?`, [date, recurringId, isRecurring]
        );
        return result ? result.id : null;
    };

    async getEventById(id: string) {
        return await this.db.getFirstAsync<EventDto>(
            `SELECT events.*,
                categories.name  AS category_name,
                categories.color AS category_color
             FROM events
             LEFT JOIN categories ON events.category_id = categories.id
             WHERE events.id = ?`, id
        );
    };

    async getEventsTimeByDate(date: string, id: string | null) {
        return await this.db.getAllAsync<{ start: string, end: string }>(
            `SELECT start, end FROM events
             WHERE events.date = ? AND events.recurring_id IS NULL AND (? IS NULL OR events.id != ?)`, date, id
        );
    };

    async getCategoryAndStartByEventId(id: string) {
        return await this.db.getFirstAsync<EventCategoryAndStartDto>(`
            SELECT 
                events.category_id,
                categories.name as category_name,
                categories.color as category_color,
                events.start
            FROM events
            LEFT JOIN categories ON events.category_id = categories.id
            WHERE events.id = ?
        `, id);
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

    async deleteEventsByRecurringId(id: string, date?: string) {
        let rows: { id: string }[];

        if (date) {
            rows = await this.db.getAllAsync('SELECT id FROM events WHERE recurring_id = ? AND date != ?', id, date);
            await this.db.runAsync('DELETE FROM events WHERE recurring_id = ? AND date != ?', id, date);
        } else {
            rows = await this.db.getAllAsync('SELECT id FROM events WHERE recurring_id = ?', id);
            await this.db.runAsync('DELETE FROM events WHERE recurring_id = ?', id);
        }

        return rows.map(row => row.id);
    };

    async deleteEventsByCategoryId(id: string) {
        const rows = await this.db.getAllAsync<{ id: string }>('SELECT id FROM events WHERE category_id = ?', id);
        await this.db.runAsync('DELETE FROM events WHERE category_id = ?', id);
        return rows;
    };
}
