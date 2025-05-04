export interface RecurringDto {
    id: string;
    frequency: "daily" | "weekly" | "monthly";
    interval: number;
    week_days: string | null;
    month_day: number | null;
    start_repeat: string;
    end_repeat: string | null;
}