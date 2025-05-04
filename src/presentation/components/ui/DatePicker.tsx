import React, {memo} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Calendar} from "react-native-calendars";


interface DatePickerProps {
    date: string,
    setDate: (date: string) => void,
    onClose: () => void
}

const DatePicker = memo(({date, setDate, onClose}: DatePickerProps) => {
    return (
        <View>
            <Calendar
                firstDay={1}
                style={{
                    borderRadius: 24,
                    height: 420,
                    width: 340,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 10
                }}
                onDayPress={(date: { timestamp: string }) => {
                    const newDate = new Date(date.timestamp);
                    setDate(newDate.toISOString().split("T")[0])
                    onClose()
                }}
                markedDates={{
                    [date]: {selected: true, selectedColor: '#6f4bf7'},
                    [new Date().toISOString().split("T")[0]]: {marked: true, selected: true, selectedColor: 'rgba(111,75,247,0.3)'}
                }}
                theme={{
                    backgroundColor: "#1a1a24",
                    calendarBackground: "#242333",
                    textSectionTitleColor: "#efeff9",
                    dayTextColor: "#efeff9",
                    monthTextColor: "#efeff9",
                    textDisabledColor: "#6b6f85",
                    arrowColor: "#6f4bf7"
                }}
            />

            <Pressable onPress={onClose} className="mt-[-20px] bg-primary px-4 py-2 rounded-b-3xl">
                <Text className="text-light-100 font-inter_semibold text-center text-lg">Cancel</Text>
            </Pressable>
        </View>
    );
});

export default DatePicker;
