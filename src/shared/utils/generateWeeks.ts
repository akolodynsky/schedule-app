const getMondayOfWeek = (date: Date) => {
    const day = date.getDay();
    const diff = (day === 0 ? -6 : 1 - day);
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
}


export const generateWeeks = (date: Date) => {
    const currentMonday = getMondayOfWeek(date);
    const weeksArr: IDay[][] = [];

    for (let i = -3; i <= 3; i++) {
        const weekStart = new Date(currentMonday);
        weekStart.setDate(currentMonday.getDate() + i * 7);

        const weekArr: IDay[] = [];

        for (let j = 0; j < 7; j++) {
            const currentDay = new Date(weekStart);
            currentDay.setDate(weekStart.getDate() + j);
            currentDay.setHours(0, 0, 0, 0);
            weekArr.push({
                date: currentDay.toLocaleDateString("sv-SE"),
                day: currentDay.toLocaleDateString('en-US', {weekday: 'short'})
            });
        }
        weeksArr.push(weekArr);
    }
    return weeksArr;
};

