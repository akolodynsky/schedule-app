import * as SQLite from "expo-sqlite";
import {TaskDto} from "@/src/data/dto/TaskDto";
import {generateUniqueId} from "@/src/shared/utils";


export class TaskDatasource {
    private db!: SQLite.SQLiteDatabase;

    constructor() {
        void this.init();
    };

    private async init() {
        this.db = await SQLite.openDatabaseAsync("santitime", { useNewConnection: true });
    };

    async getTasks() {
        return await this.db.getAllAsync<TaskDto>('SELECT * FROM tasks');
    };

    async getTasksByEventId(id: string) {
        return await this.db.getAllAsync<TaskDto>('SELECT * FROM tasks WHERE event_id = ?', id);
    };

    async insertTask(dto: TaskDto) {
        try {
            console.log(dto.date)
            await this.db.runAsync(
                'INSERT INTO tasks (id, event_id, name, date, is_completed) VALUES (?, ?, ?, ?, ?)',
                [dto.id, dto.event_id, dto.name, dto.date, dto.is_completed]
            );
        } catch (error) {
            if (error instanceof Error && error.message.includes('UNIQUE constraint failed: tasks.id')) {
                const id = generateUniqueId("t");
                await this.db.runAsync(
                    'INSERT INTO tasks (id, event_id, name, date, is_completed) VALUES (?, ?, ?, ?, ?)',
                    [id, dto.event_id, dto.name, dto.date, dto.is_completed]
                );
            } else {
                console.log("insertTask", error)
            }
        }
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

    async deleteTaskByEventId(id: string) {
        await this.db.runAsync('DELETE FROM tasks WHERE event_id = ?', id);
    };
}