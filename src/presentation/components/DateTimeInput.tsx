import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import { useShallow } from "zustand/react/shallow";

import DatePickerInput from "./DatePickerInput";
import TimePickerInput from "./TimePickerInput";

import { useEventStore } from "../stores";


const DateTimeInput = () => {
    const { start, end, setEnd } = useEventStore(
        useShallow((state) => ({
            start: state.start,
            end: state.end,
            setEnd: state.setEnd,
        }))
    );
    
    useEffect(() => {
        if (start > end) {
            setEnd(start);
        }
    }, [start, end]);

    return (
        <View className="mb-6 justify-between flex-row" >
            <DatePickerInput />
            <TimePickerInput text={'Start'} />
            <TimePickerInput text={'End'} />
        </View>
    );
};

export default memo(DateTimeInput);
