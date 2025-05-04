export function generateUniqueId (name: string): string {
    return `${name}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function formatDate (date: string) {
    const year = new Date(date).getFullYear();
    const showYear = year !== new Date().getFullYear();

    return new Date(date).toLocaleDateString("en-Gb", {
        weekday: "short",
        day: 'numeric',
        month: 'long',
        ...(showYear && { year: "numeric"}),
    });
}

export function isCurrentTime (start: string, end: string): boolean {
    const startTime = timeToNumber(start);
    const endTime = timeToNumber(end);
    const currentTimeString = new Date().toTimeString();

    const currentTime = timeToNumber(currentTimeString);

    return startTime < currentTime && endTime > currentTime;
}


export function timeToNumber (time: string, total = false): number {
    const [hour, minute] = time.split(':').map(Number);

    if (total) return hour * 60 + minute;

    return hour + minute / 60;
}

export function getDuration (start: string, end: string) {
    const totalStartMinutes = timeToNumber(start, true);
    const totalEndMinutes = timeToNumber(end, true);

    const duration = totalEndMinutes - totalStartMinutes;

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (hours < 1) return `${minutes}m`;
    if (minutes < 1) return `${hours}h`;
    return `${hours}h ${minutes}m`;
}


export function checkTimeOverlap (newStart: string, newEnd: string, events: {start: string, end: string}[]) {
    const decimalStart = timeToNumber(newStart);
    const decimalEnd = timeToNumber(newEnd);

    let maxEndTime: string | null = null;
    let isOverlap = false;

    for (let i = 0; i < events.length; i++) {
        const decimalEventStart = timeToNumber(events[i].start);
        const decimalEventEnd = timeToNumber(events[i].end);

        if ((decimalStart < decimalEventEnd && decimalEnd > decimalEventStart) ||
            (decimalStart === decimalEventStart && decimalEnd === decimalEventStart)) {
            isOverlap = true;

            if (maxEndTime === null || decimalEventEnd > timeToNumber(maxEndTime)) {
                maxEndTime = events[i].end;
            }
        }
    }

    return { isOverlap, maxEndTime };
}

export const getMonthAndYear = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long'};
    const dateText = new Date(date).toLocaleDateString('en-US', options);
    const month = dateText.split(" ")[0];
    const year = dateText.split(" ")[1];
    return {month, year};
};