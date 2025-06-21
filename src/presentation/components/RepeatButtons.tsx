import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useShallow } from "zustand/react/shallow";
import { moderateScale, scale } from "react-native-size-matters";

import { Frequency } from "./RepeatEventInput";
import { useRecurringOptionsStore } from "../stores";
import { colors, fonts } from "@/src/shared/constants";


interface FrequencyButtonProps {
    option: Frequency;
}

export const FrequencyButton = ({ option }: FrequencyButtonProps) => {
    const { frequency, setFrequency } = useRecurringOptionsStore(
        useShallow((s) => ({
            frequency: s.frequency,
            setFrequency: s.setFrequency,
        }))
    );

    const isActive = frequency === option;
    const label = option.slice(0, 1).toUpperCase() + option.slice(1);
    const bg = isActive ? colors.primary : colors.dark_200;
    const text = isActive ? colors.light_100 : colors.light_300;

    return (
        <Pressable style={styles.buttonContainer} onPress={() => setFrequency(option)}>
            <View style={[styles.frequencyContainer, { backgroundColor: bg }]}>
                <Text style={[styles.frequencyText, { color: text }]}>{label}</Text>
            </View>
        </Pressable>
    )
};


export const DayButton = ({ day, index }: { day: string, index: number }) => {
    const { weekDays, setWeekDays } = useRecurringOptionsStore(
        useShallow((s) => ({
            weekDays: s.weekDays,
            setWeekDays: s.setWeekDays,
        }))
    );

    const handlePress = () => {
        const daysOfWeek = weekDays.includes(index)
            ? weekDays.filter(d => d !== index)
            : [...weekDays, index]
        setWeekDays(daysOfWeek)
    };

    const bg = weekDays.includes(index) ? colors.light_bg : colors.dark_200;
    const text = weekDays.includes(index) ? colors.light_100 : colors.light_300;

    return (
        <Pressable onPress={handlePress}>
            <View style={[styles.dayContainer, { backgroundColor: bg }]}>
                <Text style={[styles.dayText, { color: text }]} >
                    {day}
                </Text>
            </View>
        </Pressable>
    )
};



const styles = StyleSheet.create({
    buttonContainer: { flex: 1 },
    frequencyContainer: {
        borderRadius: moderateScale(14),
        paddingVertical: moderateScale(14),
        alignItems: 'center',
    },
    frequencyText: { fontSize: moderateScale(15), fontFamily: fonts.inter_regular },
    dayContainer: {
        borderRadius: 9999,
        width: scale(34),
        height: scale(34),
        alignItems: 'center',
        justifyContent: 'center'
    },
    dayText: { fontSize: moderateScale(15), fontFamily: fonts.inter_medium }
});