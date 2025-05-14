export interface TaskDto {
    id: string;
    event_id: string | null;
    date: string;
    name: string;
    is_completed: 1 | 0;
}