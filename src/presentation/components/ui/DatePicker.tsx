import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Calendar, DateData } from "react-native-calendars";

import { formatDate } from "@/src/shared/utils";


interface DatePickerProps {
    date: string,
    setDate: (date: string) => void,
    onClose: () => void
}

export const DatePicker = memo(({date, setDate, onClose}: DatePickerProps) => {
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
                onDayPress={(date: DateData) => {
                    setDate(date.dateString)
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
                renderHeader={(date: string) => {
                    return <Text className="text-light-100 font-inter_medium text-[15px]">{formatDate(date)}</Text>;
                }}
            />

            <Pressable onPress={onClose} className="mt-[-20px] bg-primary px-4 py-2 rounded-b-3xl">
                <Text className="text-light-100 font-inter_semibold text-center text-lg">Cancel</Text>
            </Pressable>
        </View>
    );
});
