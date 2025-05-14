export interface EventDto {
    id: string;
    date: string;
    name: string | null;
    description: string | null;
    category_id: string;
    category_name: string;
    category_color: string;
    tasks_count: number;
    start: string;
    end: string;
    is_recurring: 0 | 1;
    recurring_id: string | null;
}