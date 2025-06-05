import * as SQLite from "expo-sqlite";
import { TaskDto, TaskWithCategoryAndStartDto } from "@/src/data/dto";


export class TaskDatasource {
    private db!: SQLite.SQLiteDatabase;

    constructor() {
        void this.init();
    };

    private async init() {
        this.db = await SQLite.openDatabaseAsync("santitime", { useNewConnection: true });
    };

    async getTasks() {
        return await this.db.getAllAsync<TaskWithCategoryAndStartDto>(`
            SELECT 
                tasks.*,
                events.category_id,
                categories.name as category_name,
                categories.color as category_color,
                events.start
            FROM tasks
            LEFT JOIN events ON tasks.event_id = events.id
            LEFT JOIN categories ON events.category_id = categories.id
        `);
    };

    async getTasksByEventId(id: string, date: string) {
        return await this.db.getAllAsync<TaskDto>('SELECT * FROM tasks WHERE event_id = ? AND date = ?', id, date);
    };

    async insertTask(dto: TaskDto) {
        await this.db.runAsync(
            `INSERT INTO tasks (id, event_id, name, date, is_completed) 
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET
             date = excluded.date
        `,
            dto.id, dto.event_id, dto.name, dto.date, dto.is_completed
        );
    };

    async editTask(dto: TaskDto) {
        await this.db.runAsync(
            'UPDATE tasks SET event_id = ?, date = ?, name = ?, is_completed = ? WHERE id = ?',
            dto.event_id, dto.date, dto.name, dto.is_completed, dto.id
        );
    };

    async deleteTask(id: string) {
        await this.db.runAsync('DELETE FROM tasks WHERE id = ?', id);
    };

    async deleteTasksByEventId(id: string) {
        await this.db.runAsync('DELETE FROM tasks WHERE event_id = ?', id);
    };
}