import {useCallback, useEffect} from 'react';

import {useDateStore, useEventStore} from "../../presentation/stores";

import {useFocusEffect} from "expo-router";
import {loadEvents} from "@/src/presentation/services/eventActions";
import {loadCategories} from "@/src/presentation/services/categoryActions";


export const useLoadData = () => {
    const {selectedDate} = useDateStore.getState();
    const shouldReloadEvents = useEventStore(state => state.shouldReloadEvents);
    const setShouldReloadEvents = useEventStore(state => state.setShouldReloadEvents);

    useEffect(() => {
        void loadEvents(selectedDate)
    }, [selectedDate]);

    useFocusEffect(
        useCallback(() => {
            if (shouldReloadEvents) {
                void loadEvents(selectedDate);
                setShouldReloadEvents(false);
            }
        }, [shouldReloadEvents, selectedDate])
    );

    useEffect(() => void loadCategories(), []);
};
