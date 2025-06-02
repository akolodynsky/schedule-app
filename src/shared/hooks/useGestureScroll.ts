import {Gesture} from "react-native-gesture-handler";
import {useShallow} from "zustand/react/shallow";

import {useDateStore} from "../../presentation/stores";
import {runOnJS} from "react-native-reanimated";


export const useGestureScroll = () => {
    const { selectedDate, setSelectedDate, setDate } = useDateStore(
        useShallow((state) => ({
            selectedDate: state.selectedDate,
            setSelectedDate: state.setSelectedDate,
            setDate: state.setDate,
        }))
    );

    const changeDate = (date: string, direction: 'next' | 'prev') => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        return newDate.toISOString().split('T')[0];
    }

    const handleSwipe = (direction: 'next' | 'prev') => {
        const newDate = changeDate(selectedDate, direction);
        setSelectedDate(newDate);
        setDate(newDate);
    };

    const scrollGesture = Gesture.Native();

    const panGesture = Gesture.Pan()
        .activeOffsetX([-20, 20])
        .failOffsetY([-10, 10])
        .onEnd((event) => {
            if (event.translationX > 60) {
                runOnJS(handleSwipe)('prev')
            } else if (event.translationX < -60) {
                runOnJS(handleSwipe)('next')
            }
        })
        .simultaneousWithExternalGesture(scrollGesture);


    return {panGesture: Gesture.Simultaneous(panGesture, scrollGesture)};
};
