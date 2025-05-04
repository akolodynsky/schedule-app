import React, {useRef} from 'react';
import {FlatList, ViewToken} from 'react-native';

import {generateWeeks, getMonthAndYear} from "../utils";


interface FlatListActionsProps {
    weeks: Day[][];
    setWeeks: (weeks: React.SetStateAction<Day[][]>) => void;
    setCurrentMonth: (currentMonth: string) => void;
}

export const useDayListActions = ({weeks, setWeeks, setCurrentMonth}: FlatListActionsProps) => {
    const flatListRef = useRef<FlatList>(null);

    const scrollToIndex = (index: number) => {
        setTimeout(() => flatListRef.current?.scrollToIndex({ index, animated: false }), 10);
    };

    const handleEndReached = () => {
        const lastWeekLastDay = new Date(weeks[weeks.length - 1][6].date)
        setWeeks(generateWeeks(lastWeekLastDay));

        setTimeout(() => {
            flatListRef.current?.scrollToIndex({ index: 3, animated: false });
        }, 50)
    };

    const handleStartReached = () => {
        const firstWeekFirstDay = new Date(weeks[0][0].date);
        setWeeks(generateWeeks(firstWeekFirstDay));

        setTimeout(() => {
            flatListRef.current?.scrollToIndex({ index: 3, animated: false });
        }, 50)
    };

    const handleViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken<Day[]>[] }) => {
        if (!viewableItems.length) return;
        const { item: week } = viewableItems[0];
        const first = getMonthAndYear(week[0].date);
        const last = getMonthAndYear(week[6].date);

        const month = first.month === last.month
            ? first.month
            : `${first.month} - ${last.month}`

        const year = first.year === last.year
            ? first.year
            : `${first.year}-${last.year.split("0")[1]}`

        setCurrentMonth(`${month}, ${year}`)
    };


    return {handleEndReached, handleViewableItemsChanged, flatListRef, scrollToIndex, handleStartReached};
};
