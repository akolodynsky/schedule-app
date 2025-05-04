const getMondayOfWeek = (date: Date) => {
    const day = date.getDay();
    const diff = (day === 0 ? -6 : 1 - day);
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
}

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const generateWeeks = (date: Date) => {
    console.log("list recalculated")
    const currentMonday = getMondayOfWeek(date);
    const weeksArr: Day[][] = [];

    for (let i = -3; i <= 3; i++) {
        const weekStart = new Date(currentMonday);
        weekStart.setDate(currentMonday.getDate() + i * 7);

        const weekArr: Day[] = [];

        for (let j = 0; j < 7; j++) {
            const currentDay = new Date(weekStart);
            currentDay.setDate(weekStart.getDate() + j);
            currentDay.setHours(0, 0, 0, 0);
            weekArr.push({
                date: formatDate(currentDay),
                day: currentDay.toLocaleDateString('en-US', {weekday: 'short'})
            });
        }
        weeksArr.push(weekArr);
    }
    return weeksArr;
};

