import * as SQLite from 'expo-sqlite';
import {colors} from "@/src/shared/constants/colors";

const defaultCategories: ICategory[] = [
    {id: "c-0", name: 'Eating', color: colors[0].shades[1]},
    {id: "c-1", name: 'Homework', color: colors[2].shades[1]},
    {id: "c-2", name: 'Work', color: colors[4].shades[1]},
    {id: "c-3", name: 'Studying', color: colors[5].shades[1]},
    {id: "c-4", name: 'Break', color: colors[6].shades[1]},
    {id: "c-5", name: 'Housework', color: colors[8].shades[1]},
    {id: "c-6", name: 'Reading', color: colors[10].shades[1]},
    {id: "c-7", name: 'Personal', color: colors[11].shades[1]},
    {id: "c-8", name: 'Sleeping', color: colors[12].shades[1]},
    {id: "c-9", name: 'Commuting', color: colors[14].shades[1]},
    {id: "c-10", name: 'Workout', color: colors[15].shades[1]},
    {id: "c-11", name: 'TV', color: colors[16].shades[1]},
    {id: "c-12", name: 'Hobbies', color: colors[18].shades[1]},
    {id: "c-13", name: 'Shopping', color: colors[19].shades[1]},
    {id: "c-14", name: 'Programming', color: colors[19].shades[2]},
];

export const db = async () => {
    const db = await SQLite.openDatabaseAsync("santitime");

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
            start TEXT NOT NULL,
            end TEXT NOT NULL,
            is_recurring INTEGER DEFAULT 0,
            recurring_id TEXT,
            FOREIGN KEY (recurring_id) REFERENCES recurring_options(id)
        );

        CREATE TABLE IF NOT EXISTS tasks (
            id TEXT PRIMARY KEY,
            date TEXT NOT NULL,
            name TEXT NOT NULL,
            completed INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS event_tasks (
            event_id  TEXT,
            task_id TEXT,
            PRIMARY KEY (event_id, task_id),
            FOREIGN KEY (event_id) REFERENCES events(id),
            FOREIGN KEY (task_id) REFERENCES tasks(id)
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

    const result = await db.getAllAsync<{ count: number }>(
        'SELECT COUNT(*) as count FROM categories',
    );

    if (result[0]?.count === 0) {
        const insertStmt = await db.prepareAsync(
            'INSERT INTO categories (id, name, color) VALUES (?, ?, ?)',
        );

        for (const cate of defaultCategories) {
            await insertStmt.executeAsync([cate.id, cate.name, cate.color]);
        }

        await insertStmt.finalizeAsync();
    }
};
