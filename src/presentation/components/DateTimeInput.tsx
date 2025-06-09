import React, { memo } from 'react';
import { View } from 'react-native';

import DatePickerInput from "./DatePickerInput";
import TimePickerInput from "./TimePickerInput";


const DateTimeInput = () => {

    return (
        <View className="mb-6 justify-between flex-row" >
            <DatePickerInput />
            <TimePickerInput text={'Start'} />
            <TimePickerInput text={'End'} />
        </View>
    );
};

export default memo(DateTimeInput);
