import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Calendar, DateData } from "react-native-calendars";

import { formatDate } from "@/src/shared/utils";
import { colors } from "@/src/shared/constants";

import { DatePickerStyles } from "./styles";


interface DatePickerProps {
    date: string,
    setDate: (date: string) => void,
    onClose: () => void
}

export const DatePicker = memo(({ date, setDate, onClose }: DatePickerProps) => {
    const currentDate = new Date().toLocaleDateString("sv-SE");

    return (
        <View>
            <Calendar
                firstDay={1}
                style={DatePickerStyles.container}
                onDayPress={(date: DateData) => {
                    setDate(date.dateString)
                    onClose()
                }}
                markedDates={{
                    [currentDate]: {marked: true, selected: true, selectedColor: colors.light_bg},
                    [date]: {selected: true, selectedColor: colors.primary}
                }}
                theme={{
                    backgroundColor: colors.dark_100,
                    calendarBackground: colors.dark_200,
                    textSectionTitleColor: colors.light_100,
                    dayTextColor: colors.light_100,
                    monthTextColor: colors.light_100,
                    textDisabledColor: colors.light_300,
                    arrowColor: colors.primary
                }}
                renderHeader={(date: string) => {
                    return <Text style={DatePickerStyles.header}>{formatDate(date)}</Text>;
                }}
                enableSwipeMonths={true}
            />

            <Pressable onPress={onClose} style={DatePickerStyles.button}>
                <Text style={DatePickerStyles.buttonText}>Cancel</Text>
            </Pressable>
        </View>
    );
});
