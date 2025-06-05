import * as SQLite from 'expo-sqlite';
import { categories } from "@/src/shared/constants";


export const db = async () => {
    const db = await SQLite.openDatabaseAsync("santitime", { useNewConnection: true });

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS categories (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            color TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS events (
            id TEXT PRIMARY KEY,
            date TEXT NOT NULL,
            name TEXT,
            description TEXT,
            category_id TEXT NOT NULL,
            tasks_count INTEGER DEFAULT 0,
            start TEXT NOT NULL,
            end TEXT NOT NULL,
            is_recurring INTEGER DEFAULT 0,
            recurring_id TEXT,
            FOREIGN KEY (category_id) REFERENCES categories(id),
            FOREIGN KEY (recurring_id) REFERENCES recurring_options(id)
        );

        CREATE TABLE IF NOT EXISTS tasks (
            id TEXT PRIMARY KEY,
            event_id TEXT,
            date TEXT NOT NULL,
            name TEXT NOT NULL,
            is_completed INTEGER DEFAULT 0,
            FOREIGN KEY (event_id) REFERENCES events(id)
        );

        CREATE TABLE IF NOT EXISTS recurring_options (
            id TEXT PRIMARY KEY,
            frequency TEXT NOT NULL,
            interval INTEGER DEFAULT 1,
            week_days TEXT,
            month_day INTEGER,
            start_repeat TEXT NOT NULL,
            end_repeat TEXT,
            except_days TEXT
        );
    `);
};


export const loadDefaultCategories = async () => {
    const db = await SQLite.openDatabaseAsync("santitime", { useNewConnection: true });

    const result = await db.getAllAsync<{ count: number }>(
        'SELECT COUNT(*) as count FROM categories',
    );

    if (result[0]?.count === 0) {
        const insertStmt = await db.prepareAsync(
            'INSERT INTO categories (id, name, color) VALUES (?, ?, ?)',
        );

        for (const cate of categories) {
            await insertStmt.executeAsync([cate.id, cate.name, cate.color]);
        }

        await insertStmt.finalizeAsync();
    }
};


export const clearAllTables = async () => {
    const db = await SQLite.openDatabaseAsync("santitime", { useNewConnection: true });

    await db.withTransactionAsync(async () => {
        await db.execAsync('DELETE FROM events;');
        await db.execAsync('DELETE FROM tasks;');
        await db.execAsync('DELETE FROM categories;');
        await db.execAsync('DELETE FROM recurring_options;');
    });
};
