import React from "react";
import { Pressable, Text, View } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { Frequency } from "./RepeatEventInput";
import { useRecurringOptionsStore } from "../stores";


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

    return (
        <Pressable
            className="flex-1"
            onPress={() => setFrequency(option)}
        >
            <View className={`rounded-2xl py-4 items-center ${isActive ? "bg-primary" : "bg-dark-200"}`}>
                <Text className={`font-inter_regular text-lg ${isActive ? "text-light-100" : "text-light-300"}`}>{label}</Text>
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

    return (
        <Pressable
            onPress={() => {
                const daysOfWeek = weekDays.includes(index)
                    ? weekDays.filter(d => d !== index)
                    : [...weekDays, index]
                setWeekDays(daysOfWeek)}
            }
        >
            <View
                className={`rounded-full w-11 h-11 items-center justify-center 
                ${weekDays.includes(index) ? "bg-light_bg" : "bg-dark-200"}`}
            >
                <Text
                    className={`font-inter_medium text-light-100 text-lg 
                    ${weekDays.includes(index) ? "text-light-100" : "text-light-300"}`}
                >
                    {day}
                </Text>
            </View>
        </Pressable>
    )
};