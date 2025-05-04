import {useCallback, useRef} from "react";
import {PanGestureHandlerGestureEvent} from "react-native-gesture-handler";
import {useShallow} from "zustand/react/shallow";

import {useDateStore} from "../../presentation/stores";


export const useGestureScroll = () => {
    const { selectedDate, setSelectedDate, setDate } = useDateStore(
        useShallow((state) => ({
            selectedDate: state.selectedDate,
            setSelectedDate: state.setSelectedDate,
            setDate: state.setDate,
        }))
    );

    const scrollViewRef = useRef(null);

    const changeDate = (date: string, direction: 'next' | 'prev') => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        return newDate.toISOString().split('T')[0];
    }

    const onGestureEvent = useCallback((event: PanGestureHandlerGestureEvent) => {
        if (event.nativeEvent.state === 5) {
            if (event.nativeEvent.translationX > 60) {
                setSelectedDate(changeDate(selectedDate, 'prev'));
                setDate(changeDate(selectedDate, 'prev'));
            } else if (event.nativeEvent.translationX < -60) {
                setSelectedDate(changeDate(selectedDate, 'next'));
                setDate(changeDate(selectedDate, 'next'));
            }
        }
    }, [selectedDate]);

    return {scrollViewRef, onGestureEvent};
};
