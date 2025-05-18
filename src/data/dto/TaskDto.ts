export interface TaskDto {
    id: string;
    event_id: string | null;
    date: string;
    name: string;
    is_completed: 1 | 0;
}

export interface TaskWithCategoryDto extends TaskDto {
    category_id: string | null;
    category_name: string | null;
    category_color: string | null;
}
