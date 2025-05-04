import * as SQLite from "expo-sqlite";
import { generateUniqueId } from "../../shared/utils";
import { EventDto } from "@/src/data/dto/EventDto";


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

    async getSingleEventId(date: string, recurringId: string) {
        try {
            console.log(date, recurringId, "---------------------");
            return await this.db.getFirstAsync<string>(
                `SELECT events.id FROM events
                 WHERE events.date = ? AND events.recurring_id = ?  AND events.is_recurring = 0`, [date, recurringId]
            );
        } catch (error) {
            console.log(error);
        }
    };

    async getEventsTimeByDate(date: string, id: string | null) {
        return await this.db.getAllAsync<{ start: string, end: string }>(
            `SELECT 
            events.start, 
            events.end 
         FROM events
         WHERE events.date = ? AND events.recurring_id IS NULL AND (? IS NULL OR events.id != ?)`, date, id
        );
    };

    async insertEvent(dto: EventDto) {
        try {
            await this.db.runAsync(
                `INSERT INTO events (id, date, name, description, category_id, start, end, is_recurring, recurring_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                dto.id, dto.date, dto.name, dto.description, dto.category_id, dto.start, dto.end, dto.is_recurring, dto.recurring_id
            );
        } catch (e) {
            console.error(e);
        }
    };

    async editEvent(dto: EventDto) {
        try {
            console.log(dto)
            await this.db.runAsync(
                'UPDATE events SET date = ?, name = ?, description = ?, category_id = ?, start = ?, end = ?, is_recurring = ?, recurring_id = ? WHERE id = ?',
                dto.date, dto.name, dto.description, dto.category_id, dto.start, dto.end, dto.is_recurring, dto.recurring_id, dto.id
            );
        } catch (e) {
            console.error(e);
        }

    };

    async deleteEvent(id: string) {
        await this.db.runAsync('DELETE FROM events WHERE id = ?', id);
    }
}
