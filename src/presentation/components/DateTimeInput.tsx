import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { moderateScale } from "react-native-size-matters";

import DatePickerInput from "./DatePickerInput";
import TimePickerInput from "./TimePickerInput";


const DateTimeInput = () => {

    return (
        <View style={styles.container}>
            <View style={{ width: '45%' }}>
                <DatePickerInput />
            </View>
            <View style={styles.timeContainer}>
                <TimePickerInput text={'Start'} />
                <TimePickerInput text={'End'} />
            </View>
        </View>
    );
};

export default memo(DateTimeInput);



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    timeContainer: {
        flexDirection: 'row',
        width: '50%',
        gap: moderateScale(12)
    }
});
