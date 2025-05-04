interface TextInputProps {
    title: string;
    value: string;
    setValue: (value: string) => void;
}

// interface Category {
//     id: string;
//     name: string;
//     color: string;
// }
//
// interface UserEvent {
//     id: string,
//     date: string,
//     name: string,
//     description: string,
//     category: Category,
//     tasks: Task[],
//     start: string,
//     end: string,
//     recurringId: string,
//     isGap: boolean,
// }
//
// interface RecurringOption {
//     id: string,
//     frequency: "daily" | "weekly" | "monthly",
//     interval: number,
//     daysOfWeek: number[],
//     dayOfMonth: number | null,
//     startRepeat: string,
//     endRepeat: string | null,
// }

interface Gap {
    id: string;
    start: string;
    end: string;
}

// interface Task {
//     id: string;
//     date: string;
//     name: string;
//     isCompleted: boolean;
// }

interface TasksBlock {
    key: string,
    tasks: Task[],
}

interface EventsBlock {
    key: string,
    events: UserEvent[],
}

interface MergedTasksBlock {
    date: string;
    tasks: Task[];
    events: UserEvent[];
}

interface Day {
    date: string,
    day: string,
}


