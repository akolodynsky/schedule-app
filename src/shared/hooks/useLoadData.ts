import {useEffect} from 'react';

import {useDateStore} from "@/src/presentation/stores";
import {loadCategories} from "@/src/presentation/services/category";
import {loadEvents} from "@/src/presentation/services/event";


export const useLoadData = () => {
    const {selectedDate} = useDateStore.getState();

    useEffect(() => {
        void loadEvents(selectedDate)
    }, [selectedDate]);

    useEffect(() => void loadCategories(), []);
};
