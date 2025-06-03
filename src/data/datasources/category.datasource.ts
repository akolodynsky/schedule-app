import * as SQLite from "expo-sqlite";
import { CategoryDto } from "@/src/data/dto";


export class CategoryDatasource {
    private db!: SQLite.SQLiteDatabase;

    constructor() {
        void this.init();
    };

    private async init() {
        this.db = await SQLite.openDatabaseAsync("santitime", { useNewConnection: true });
    };

    async getCategories() {
        return await this.db.getAllAsync<CategoryDto>('SELECT * FROM categories');
    };

    async insertCategory(dto: CategoryDto) {
        await this.db.runAsync(
            'INSERT INTO categories (id, name, color) VALUES (?, ?, ?)',
            dto.id, dto.name, dto.color
        );
    };

    async editCategory(dto: CategoryDto) {
        await this.db.runAsync(
            'UPDATE categories SET name = ?, color = ? WHERE id = ?',
            dto.name, dto.color, dto.id
        );
    };

    async deleteCategory(id: string) {
        await this.db.runAsync('DELETE FROM categories WHERE id = ?', id);
    };
}