import * as SQLite from "expo-sqlite";
import {TaskDto} from "@/src/data/dto/TaskDto";


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

    async insertTask(dto: TaskDto) {
        await this.db.runAsync(
            'INSERT INTO tasks (id, date, name, is_completed) VALUES (?, ?, ?, ?)',
            [dto.id, dto.name, dto.date, dto.is_completed]
        );
    };

    async editTask(dto: TaskDto) {
        await this.db.runAsync(
            'UPDATE tasks SET date = ?, name = ?, is_completed = ? WHERE id = ?',
            dto.date, dto.name, dto.is_completed, dto.id
        );
    };

    async deleteTask(id: string) {
        await this.db.runAsync('DELETE FROM tasks WHERE id = ?', id);
    };
}